import { Point2d } from "ts-3dge";
import { AbstractEventHandler } from "./AbstractEventHandler";
import { CanvasComponent } from "../canvas/canvas.component";
import { Line } from "./Line";
import { TemporaryLine } from "./TemporaryLine";

export class LineEventHandler extends AbstractEventHandler {
    startPt: Point2d = null;
    endPt: Point2d = null;
    m_TempLine: Line = new Line();

    public constructor(canvas: CanvasComponent){
        super(canvas);
    }

    protected override onMouseDown(e: MouseEvent): void {
        super.onMouseDown(e);
    }

    protected override onMouseUp(e: MouseEvent): void {
        super.onMouseUp(e);
    }

    protected override onMouseMove(e: MouseEvent): void {
        super.onMouseMove(e);
        let pos = this.canvas.toPoint(e);
        let scene = this.canvas.getScene();
        if(this.startPt !== null){
            this.m_TempLine.setEndPoint(pos);
            this.canvas.redraw();
        }
    }

    protected override onMouseClick(e: PointerEvent): void {
        super.onMouseClick(e);
        if(e.button !== 0){
            return;
        }
        let pos = this.canvas.toPoint(e);
        let scene = this.canvas.getScene();
        if(this.startPt == null){
            this.startPt = pos;
            this.m_TempLine = new TemporaryLine(this.startPt, this.startPt);
            scene.addTempEntity(this.m_TempLine);
        }else {
            let line = new Line(this.m_TempLine.getStartPoint(), this.m_TempLine.getEndPoint());
            scene.addEntity(line);

            this.m_TempLine.setStartPoint(pos);

            this.canvas.redraw();         
        }
    }

    public override finish(): void {
        if(this.m_TempLine !== null){
            let scene = this.canvas.getScene();
            scene.removeTempEntity(this.m_TempLine);
            this.canvas.redraw();
            this.m_TempLine = null;
        }
    }
    
    protected override onKeyUp(e: KeyboardEvent): void {
        super.onKeyUp(e);
        this.finish();
        this.canvas.setDefaultEventHandler();
    }

}