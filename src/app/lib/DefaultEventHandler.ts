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
        this.clearHover();
        let pos = this.canvas.toPoint(e);
        let scene = this.canvas.getScene();
        let selectedEntities = scene.getSelectedEntities();
        this.m_HoveredEntities = scene.getEntitiesOverPoint(pos);
        selectedEntities.forEach(selectedEntity => {
            let gripPoints = selectedEntity.getGripPoints();
            gripPoints.forEach((gripPoint, index) => {
                if(gripPoint.distanceTo(pos)/this.canvas.s < Entity.HOVERED_CLOSE_POINT_TOLERANCE){
                    selectedEntity.setHover(true, index);
                    this.m_HoveredEntities.push(selectedEntity);
                }
            });
        })
        
        this.m_HoveredEntities.forEach(entity => {
            let gripPoints = entity.getGripPoints();
            let hoveredGripIndex = -1;
                gripPoints.forEach((gripPoint, index) => {
                    if(gripPoint.distanceTo(pos)/this.canvas.s < Entity.HOVERED_CLOSE_POINT_TOLERANCE){
                        hoveredGripIndex = index;
                        // break should be applied here. syntax error issue.
                    }
                });
                entity.setHover(true, hoveredGripIndex);
        });
        this.canvas.redraw();
    }

    protected override onMouseWheel(e: WheelEvent){
        super.onMouseWheel(e);
    }
    
    protected clearHover(){
        this.m_HoveredEntities.forEach(entity => {
            entity.setHover(false);
        })
        this.m_HoveredEntities = [];
    }
    protected m_HoveredEntities: Entity[] = [];
}