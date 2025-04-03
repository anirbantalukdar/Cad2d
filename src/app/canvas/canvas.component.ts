import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
  }
};

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})
export class CanvasComponent implements AfterViewInit{
  protected dx : number = 0;
  protected dy: number = 0;
  protected s: number = 1;

  protected dragStart : Vector = null;
  protected dragging: boolean = false;
  protected canvas: HTMLCanvasElement = null;

  @ViewChild('canvasEl') canvasEl: ElementRef;
  @ViewChild('xInput') xDiv: ElementRef;

  /** Canvas 2d context */
  private ctx: CanvasRenderingContext2D;

  ngAfterViewInit() {
    this.canvas = this.canvasEl.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.canvas.addEventListener('wheel', e => this.onWheel(e));
    this.canvas.addEventListener('mousedown', e => this.onMouseDown(e));
    this.canvas.addEventListener('mousemove', e => this.onMouseMove(e));
    this.canvas.addEventListener('mouseup', e => this.onMouseUp(e));

    this.draw();
  }


  public mouseOffset(e: MouseEvent | WheelEvent){
    return new Vector(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop);
  }

  private transform(x: number, y: number): Vector{
    return new Vector(this.dx + this.s * x, this.dy + this.s * y);
  }

  private scale(s: number){
    this.ctx.scale(s, s);
    this.s *= 1/s;
    this.dx *= 1/s;
    this.dy *= 1/s;
  }

  private translate(dx: number, dy: number){
    this.ctx.translate(dx, dy);
    this.dx -= dx;
    this.dy -= dy;
  }

  private onMouseDown(e: MouseEvent){
    e.preventDefault();
    e.stopPropagation();

    const mouseOffset = this.mouseOffset(e);
    this.dragStart = this.transform(mouseOffset.x, mouseOffset.y);
    this.dragging = true;
  }

  private onMouseMove(e: MouseEvent){
    e.preventDefault();
    e.stopPropagation();

    this.xDiv.nativeElement.style.left  = (e.clientX + 50) + "px";
    this.xDiv.nativeElement.style.top  = (e.clientY + 50) + "px";
    //this.canvas.focus();
    if(!this.dragging){
      return;
    }
    const offset = this.mouseOffset(e);
    const dragEnd = this.transform(offset.x, offset.y);

    const dx = dragEnd.x - this.dragStart.x;
    const dy = dragEnd.y - this.dragStart.y;

    this.translate(dx, dy);
    this.draw();
    this.dragStart = this.transform(offset.x, offset.y);
  }

  private onMouseUp(e: MouseEvent){
    e.preventDefault();
    e.stopPropagation();

    this.dragging = false;
  }

  private onWheel(e: WheelEvent){
    e.preventDefault();
    e.stopPropagation();

    const offset = this.mouseOffset(e);
    const zoomCenter = this.transform(offset.x, offset.y);
    const factor = Math.sign(e.deltaY) > 0 ? 0.9 : 1.1;

    this.translate(zoomCenter.x, zoomCenter.y);
    this.scale(factor);
    this.translate(-zoomCenter.x, -zoomCenter.y);

    this.draw();
  }

  private drawCircle() {
    this.ctx.beginPath();
    this.ctx.arc(100, 100, 50, 0, 2 * Math.PI, false);
    this.ctx.strokeStyle = 'teal';
    this.ctx.lineWidth = 5;
    this.ctx.fillStyle = 'white';
    this.ctx.stroke();
    this.ctx.fill();
  }
  
  private draw() {
    this.clearCanvas();
    this.drawCircle();
  }

  private clearCanvas() {
    const { x: left, y: top } = this.transform(0, 0);
    const { x: right, y: bottom } = this.transform(this.ctx.canvas.width, this.ctx.canvas.height);
    const width = Math.abs(right - left);
    const height = Math.abs(bottom - top);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(left, top, width, height);
  }
}
