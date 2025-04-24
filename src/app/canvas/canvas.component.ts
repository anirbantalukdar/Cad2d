import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Application } from '../lib/Application';
import { Point2d } from 'ts-3dge';
import { IEventHandler } from '../lib/IEventHandler';
import { DefaultEventHandler } from '../lib/DefaultEventHandler';

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
  private defaultEventHandler : IEventHandler = null;

  ngAfterViewInit() {
    this.canvas = this.canvasEl.nativeElement;
    let app = Application.getInstance();
    app.setCanvas(this.canvas);
    this.ctx = app.getRenderingContext();
    this.defaultEventHandler = new DefaultEventHandler(this);
    this.defaultEventHandler.activate();

    this.redraw();
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvasEl.nativeElement;
  }

  public getCanvasContext(): CanvasRenderingContext2D{
    return this.ctx;
  }

  private onMouseOut(e: MouseEvent){
    this.xDiv.nativeElement.style.display = 'none'; 
  }

  private onMouseEnter(e: MouseEvent){
    this.xDiv.nativeElement.style.display = 'block'; 
  }

  public mouseOffset(e: MouseEvent | WheelEvent){
    return new Vector(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop);
  }

  private transform(x: number, y: number): Point2d{
    return new Point2d(this.dx + this.s * x, this.dy + this.s * y);
  }

  public scale(s: number){
    this.ctx.scale(s, s);
    this.s *= 1/s;
    this.dx *= 1/s;
    this.dy *= 1/s;
  }

  public translate(dx: number, dy: number){
    this.ctx.translate(dx, dy);
    this.dx -= dx;
    this.dy -= dy;
  }


  public toPoint(e: MouseEvent){
    const mouseOffset = this.mouseOffset(e);
    return this.transform(mouseOffset.x, mouseOffset.y);
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
  
  public redraw() {
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
