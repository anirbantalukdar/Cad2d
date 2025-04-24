import { Bound2d, Matrix2, Point2d, Vector2d } from "ts-3dge";
import { Color } from "./Color";
import { Collection } from "ts-collection";

export abstract class Entity {
    public abstract getBoundingBox(): Bound2d;
    public getColor() : Color{
        return this.m_Color;
    }

    public setColor(color: Color): void {
        this.m_Color = color;
    }

    public abstract draw(): void;
    public abstract explode(): Collection<Entity>;
    public abstract getGripPoints(): Collection<Point2d>;
    public abstract getSnapPoints(): Collection<Point2d>;
    public abstract moveGripPointsAt(index: number, offset: Vector2d) : void;
    public abstract setVisible(visible: boolean): void;
    public isVisible(): boolean {
        return this.m_Visible;
    }
    public abstract intersectWith(ent: Entity): Collection<Point2d>;
    public abstract transformy(mat: Matrix2): void;
    public abstract select(): void;
    public abstract isSelected(): boolean;
    
    protected m_Visible: boolean;
    protected m_Color: Color;

}