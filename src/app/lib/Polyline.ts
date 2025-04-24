import { Bound2d, Point2d, Vector2d, Matrix2 } from "ts-3dge";
import { Collection } from "ts-collection";
import { Entity } from "./Entity";

export class Line extends Entity {
    public override getBoundingBox(): Bound2d {
        let bound = new Bound2d();
        bound.addPoint(this.m_StartPoint);
        bound.addPoint(this.m_EndPoint);
        return bound;
    }
    public override draw(): void {
        throw new Error("Method not implemented.");
    }
    public override explode(): Collection<Entity> {
        throw new Error("Method not implemented.");
    }
    public override getGripPoints(): Collection<Point2d> {
        throw new Error("Method not implemented.");
    }
    public override getSnapPoints(): Collection<Point2d> {
        throw new Error("Method not implemented.");
    }
    public override moveGripPointsAt(index: number, offset: Vector2d): void {
        throw new Error("Method not implemented.");
    }
    public override setVisible(visible: boolean): void {
        throw new Error("Method not implemented.");
    }
    public override intersectWith(ent: Entity): Collection<Point2d> {
        throw new Error("Method not implemented.");
    }
    public override transformy(mat: Matrix2): void {
        throw new Error("Method not implemented.");
    }
    public override select(): void {
        throw new Error("Method not implemented.");
    }
    public override isSelected(): boolean {
        throw new Error("Method not implemented.");
    }
    
    protected m_StartPoint: Point2d;
    protected m_EndPoint: Point2d;
}