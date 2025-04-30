import { Point2d } from "ts-3dge";
import { AbstractEventHandler } from "./AbstractEventHandler";
import { CanvasComponent } from "../canvas/canvas.component";
import { Entity } from "./Entity";

export class DefaultEventHandler extends AbstractEventHandler {

    public constructor(canvas: CanvasComponent){
        super(canvas);
    }

    protected override onMouseDown(e: MouseEvent){
        super.onMouseDown(e);
    }

    protected override onMouseUp(e: MouseEvent){
        super.onMouseUp(e);
    }
    
    protected override onMouseMove(e: MouseEvent) {
        super.onMouseMove(e);

    }

    protected override onMouseWheel(e: WheelEvent){
        super.onMouseWheel(e);
        this.clearHover();
        let pos = this.canvas.toPoint(e);
        let scene = this.canvas.getScene();
        this.m_HoveredEntities = scene.getEntitiesOverPoint(pos);
        this.m_HoveredEntities.forEach(entity => {
            entity.setHover(true);
        });
        this.canvas.redraw();
    }
    
    protected clearHover(){
        this.m_HoveredEntities.forEach(entity => {
            entity.setHover(false);
        })
        this.m_HoveredEntities = [];
    }
    protected m_HoveredEntities: Entity[] = [];
}