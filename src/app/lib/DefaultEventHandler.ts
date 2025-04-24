import { Point2d } from "ts-3dge";
import { AbstractEventHandler } from "./AbstractEventHandler";
import { CanvasComponent } from "../canvas/canvas.component";

export class DefaultEventHandler extends AbstractEventHandler {
    protected dragStartPt: Point2d;
    protected ctx : CanvasRenderingContext2D;

    public constructor(canvas: CanvasComponent){
        super(canvas);
    }

    protected override onMouseDown(e: MouseEvent){
        super.onMouseDown(e);

        this.dragStartPt = this.canvas.toPoint(e);
        console.log('Mouse down');
    }

    protected override onMouseUp(e: MouseEvent){
        this.dragStartPt = null;
        console.log('Mouse up');
    }
    
    protected override onMouseMove(e: MouseEvent) {
        super.onMouseMove(e);
        if(this.dragStartPt == null){
            return;
        }
        console.log('mouse move');
        const dragEnd = this.canvas.toPoint(e);

        const dx = dragEnd.x - this.dragStartPt.x;
        const dy = dragEnd.y - this.dragStartPt.y;

        this.canvas.translate(dx, dy);
        this.canvas.redraw();
    }

    protected override onMouseWheel(e: WheelEvent){
        super.onMouseWheel(e);

        const zoomCenter = this.canvas.toPoint(e);
        const factor = Math.sign(e.deltaY) > 0 ? 0.9 : 1.1;

        this.canvas.translate(zoomCenter.x, zoomCenter.y);
        this.canvas.scale(factor);
        this.canvas.translate(-zoomCenter.x, -zoomCenter.y);

        this.canvas.redraw();
    }
}