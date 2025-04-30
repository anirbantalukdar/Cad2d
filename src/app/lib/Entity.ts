import { Bound2d, Matrix2, Point2d, Vector2d } from "ts-3dge";
import { Color } from "./Color";
import { Collection } from "ts-collection";

export abstract class Entity {
    public static CLOSE_POINT_TOLERANCE = 0.001;

    public abstract getBoundingBox(): Bound2d;
    public getColor() : Color{
        return this.m_Color;
    }

    public setColor(color: Color): void {
        this.m_Color = color;
    }

    public abstract draw(ctx: CanvasRenderingContext2D): void;
    public abstract explode(): Collection<Entity>;
    public abstract getGripPoints(): Collection<Point2d>;
    public abstract getSnapPoints(): Collection<Point2d>;
    public abstract moveGripPointsAt(index: number, offset: Vector2d) : void;
    public abstract isCloseToPos(pos: Point2d): boolean;

    public  setVisible(visible: boolean): void{
        this.m_Visible = visible;
    }
    public isVisible(): boolean {
        return this.m_Visible;
    }
    public abstract intersectWith(ent: Entity): Collection<Point2d>;
    public abstract transformy(mat: Matrix2): void;
    
    public select(selected: boolean): void {
        this.m_Selected = selected; 
    }

    public isSelected(): boolean{
        return this.m_Selected;
    }
    
    public setHover(hover: boolean){
        this.m_Hover = hover;
    }

    public isHover(): boolean {
        return this.m_Hover;
    }

    protected drawGripPoints(ctx: CanvasRenderingContext2D, gripPoints: Array<Point2d>){
        ctx.fillStyle = 'orange';
        ctx.beginPath();
        gripPoints.forEach(gripPoint => {
            ctx.arc(gripPoint.x, gripPoint.y, 5*(ctx as any).s, 0, 2*Math.PI);
        })
        ctx.fill();
    }

    protected m_Visible: boolean;
    protected m_Color: Color;
    protected m_Selected: boolean;
    protected m_Hover: boolean;
}