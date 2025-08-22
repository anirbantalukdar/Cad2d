import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Application } from '../lib/Application';
import { Point2d } from 'ts-3dge';
import { IEventHandler } from '../lib/IEventHandler';
import { DefaultEventHandler } from '../lib/DefaultEventHandler';
import { Scene } from '../lib/Scene';
import { Line } from '../lib/Line';
import { of } from 'rxjs';
import { Entity } from '../lib/Entity';
import { LineEventHandler } from '../lib/LineEventHandler';
import { VertexDictionary } from '../lib/VertexDictionary';

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
  public dx : number = 0;
  public dy: number = 0;
  public s: number = 1;

  protected dragStart : Vector = null;
  protected dragging: boolean = false;
  protected canvas: HTMLCanvasElement = null;

  @ViewChild('canvasEl') canvasEl: ElementRef;
  @ViewChild('xInput') xDiv: ElementRef;

  /** Canvas 2d context */
  private ctx: CanvasRenderingContext2D;
  private defaultEventHandler : IEventHandler = null;
  private eventHandler : IEventHandler = null;
  private scene: Scene = new Scene();

  ngAfterViewInit() {
    this.canvas = this.canvasEl.nativeElement;
    let app = Application.getInstance();
    app.setCanvas(this.canvas);
    this.ctx = app.getRenderingContext();
    Object.defineProperty(this.ctx, "dx", {value: this.dx, writable: true});
    Object.defineProperty(this.ctx, "dy", {value: this.dy, writable: true});
    Object.defineProperty(this.ctx, "s", {value: this.s, writable: true});

    this.defaultEventHandler = new DefaultEventHandler(this);
    this.setEventHandler(this.defaultEventHandler);

    let lineEventHandler = new LineEventHandler(this);
    //this.setEventHandler(lineEventHandler);

    let line = new Line(new Point2d(0, 0), new Point2d(100, 100));
    line.setSelected(true);
    this.scene.addEntity(line);

    this.redraw();
  }

  public setDefaultEventHandler(){
    this.setEventHandler(this.defaultEventHandler);
  }

  public setEventHandler(handler: IEventHandler): void {
    if(this.eventHandler != null){
      this.eventHandler.deactivate();
    }
    this.eventHandler = handler;
    if(this.eventHandler != null){
      this.eventHandler.activate();
    }
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
    (this.ctx as any).s = this.s;
    (this.ctx as any).dx = this.dx;
    (this.ctx as any).dy = this.dy;
  }

  public translate(dx: number, dy: number){
    this.ctx.translate(dx, dy);
    this.dx -= dx;
    this.dy -= dy;
    (this.ctx as any).dx = this.dx;
    (this.ctx as any).dy = this.dy;
  }


  public toPoint(e: MouseEvent){
    const mouseOffset = this.mouseOffset(e);
    return this.transform(mouseOffset.x, mouseOffset.y);
  }

  public getScene(){
    return this.scene;
  }

  private draw(){
    let defaultEntities  = this.scene.getDefaultEntities();
    defaultEntities.forEach(ent => {
    this.ctx.lineWidth = this.s;
      ent.draw(this.ctx)
    });
    // get vertex grip points.
    let selectedEntities = this.scene.getSelectedEntities();
    selectedEntities.forEach((selectedEntity) => {
      let absGripPoints = selectedEntity.getAbsoluteGripPoints();
      absGripPoints.forEach((absGripPoint) => {
        absGripPoint.draw(this.ctx);
      });

      let vDict = VertexDictionary.getInstance();
      let indexedGripPoints = vDict.getIndexedGripPoints();
      indexedGripPoints.forEach((indexedGripPoint) => {
        indexedGripPoint.draw(this.ctx);
      });
    })
    // Draw temporary items
    let tempEntities = this.scene.getTempEntities();
    tempEntities.forEach(ent => {
      this.ctx.lineWidth = this.s;
      ent.draw(this.ctx)
    });
  }

  public redraw() {
    this.clearCanvas();
    this.draw();
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
