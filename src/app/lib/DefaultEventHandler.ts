import { Point2d } from "ts-3dge";
import { AbstractEventHandler } from "./AbstractEventHandler";
import { CanvasComponent } from "../canvas/canvas.component";
import { Entity } from "./Entity";
import { GripPoint } from "./GripPoint";
import { VertexDictionary } from "./VertexDictionary";
import { TemporaryLine } from "./TemporaryLine";

export class DefaultEventHandler extends AbstractEventHandler {

    public constructor(canvas: CanvasComponent){
        super(canvas);
    }

    protected override onMouseDown(e: MouseEvent){
        super.onMouseDown(e);
        if(this.m_HoveredGripPoint != null){
            this.m_TempLine = new TemporaryLine(this.m_HoveredGripPoint.getPosition(), this.m_HoveredGripPoint.getPosition());
            let scene = this.canvas.getScene();
            scene.addTempEntity(this.m_TempLine);
            this.m_LockedGripPoint = this.m_HoveredGripPoint;
            this.m_HoveredGripPoint = null;
        }
    }

    protected override onMouseUp(e: MouseEvent){
        super.onMouseUp(e);
        let pos = this.canvas.toPoint(e);
        if(this.m_LockedGripPoint != null){
            if(this.m_TempLine != null){
                let scene = this.canvas.getScene();
                scene.removeTempEntity(this.m_TempLine);
                this.m_LockedGripPoint.moveGripPointTo(pos);
                this.m_TempLine = null;
            }
            this.m_LockedGripPoint = null;
        }
    }
    
    protected override onMouseClick(e: PointerEvent): void {
        super.onMouseClick(e);
        let scene = this.canvas.getScene();
        if(this.m_HoveredGripPoint == null && this.m_HoveredEntity == null){
            scene.clearSelection();
            this.canvas.redraw();
            return;
        }

        if(!e.ctrlKey){
            scene.clearSelection();
        }
        if(this.m_HoveredEntity != null){
            this.m_HoveredEntity.setSelected(true);
        }
        this.canvas.redraw();
        
    }
    protected override onMouseMove(e: MouseEvent) {
        super.onMouseMove(e);
        let pos = this.canvas.toPoint(e);
        if(this.m_LockedGripPoint != null){
            if(this.m_TempLine != null){
                this.m_TempLine.setEndPoint(pos);
            }
            this.canvas.redraw();
            return;
        }
        let scene = this.canvas.getScene();
        this.clearHover();

        let entitiesOverPos = scene.getEntitiesOverPoint(pos);
        if(entitiesOverPos.length != 0){
            this.m_HoveredEntity = entitiesOverPos[0];
            this.m_HoveredEntity.setHover(true);
        }

        let selectedEntities = scene.getSelectedEntities();
        console.log(selectedEntities);
        selectedEntities.forEach(selectedEntity => {
            let gripPoints = selectedEntity.getGripPoints();
            for(let i=0; i<gripPoints.length; i++){
                let gripPoint = gripPoints[i];
                if((gripPoint.distanceTo(pos)/this.canvas.s) < Entity.HOVERED_CLOSE_POINT_TOLERANCE){
                    selectedEntity.setHover(true, gripPoint.getRefNo(selectedEntity));
                    this.m_HoveredEntity = selectedEntity;
                    this.m_HoveredGripPoint = gripPoint;
                    break;
                }
            };
        })

        this.canvas.redraw();
    }

    protected override onMouseWheel(e: WheelEvent){
        super.onMouseWheel(e);
    }
    
    protected clearHover(){
        let scene = this.canvas.getScene();
        let defaultEntities = scene.getDefaultEntities();
        defaultEntities.forEach(entity => {
            entity.setHover(false, -1);
        })
        this.m_HoveredEntity = null;
        this.m_HoveredGripPoint = null;
    }

    protected m_HoveredEntity: Entity = null;
    protected m_HoveredGripPoint: GripPoint = null;
    protected m_LockedGripPoint: GripPoint = null;
    protected m_TempLine : TemporaryLine = null;
}