import { Point2d } from "ts-3dge";
import { Entity } from "./Entity";

export abstract class GripPoint {
    public constructor(entity: Entity, gripRef: number){
        this.m_Entity = entity;
        this.m_GripRef = gripRef;
    }

    public distanceTo(pos: Point2d): number{
        return this.getPosition().distanceTo(pos);
    }

    public abstract moveGripPointTo(pos: Point2d): void;

    public getPosition(): Point2d {
        return this.m_Entity.getGripPos(this.m_GripRef);
    }
    
    protected m_Entity: Entity;
    protected m_GripRef: number;
}