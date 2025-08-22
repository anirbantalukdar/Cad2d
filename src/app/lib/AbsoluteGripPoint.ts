import { Point2d } from "ts-3dge";
import { GripPoint } from "./GripPoint";
import { Entity } from "./Entity";

export class AbsoluteGripPoint extends GripPoint {
    constructor(entity: Entity, gripRef: number){
        super();
        this.m_Entity = entity;
        this.m_GripRef = gripRef;
    }

    public override moveGripPointTo(pos: Point2d): void {
        throw new Error("Method not implemented.");
    }

    public override getPosition(): Point2d {
        return this.m_Entity.getGripPos(this.m_GripRef);
    }

    public override isHovered(): boolean {
        return this.m_Entity.hoveredGripIndex() == this.m_GripRef;
    }

    public override isVisible(): boolean {
        return this.m_Entity.isSelected();
    }

    public override isLocked(): boolean {
        return false;
    }
    public override getRefNo(entity: Entity = null): number {
        return this.m_GripRef;
    }

    protected m_Entity: Entity;
    protected m_GripRef: number;
}