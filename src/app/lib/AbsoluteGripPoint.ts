import { Point2d } from "ts-3dge";
import { GripPoint } from "./GripPoint";
import { Entity } from "./Entity";

export class AbsoluteGripPoint extends GripPoint {
    constructor(entity: Entity, index: number){
        super(entity, index);
    }

    public override moveGripPointTo(pos: Point2d): void {
        throw new Error("Method not implemented.");
    }

    public override distanceTo(pos: Point2d): number {
        return this.m_Entity.getGripPos(this.m_GripRef).distanceTo(pos);
    }
}