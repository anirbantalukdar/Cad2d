import { Point2d } from "ts-3dge";
import { Entity } from "./Entity";

export abstract class GripPoint {
    public constructor(){
    }

    public distanceTo(pos: Point2d): number{
        return this.getPosition().distanceTo(pos);
    }

    public draw(ctx: CanvasRenderingContext2D){
        let pos = this.getPosition();
        ctx.fillStyle = 'orange';
        if(this.isHovered()){
            ctx.fillStyle = 'red';
        }
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 5*(ctx as any).s, 0, 2*Math.PI);
        ctx.fill();
    }

    public abstract getRefNo(entity: Entity): number;
    public abstract moveGripPointTo(pos: Point2d): void;
    public abstract isHovered() : boolean;
    public abstract isVisible(): boolean;
    public abstract isLocked(): boolean;
    public abstract getPosition(): Point2d;
}