import { Bound2d, Matrix2, Point2d, Vector2d } from "ts-3dge";
import { Color } from "./Color";
import { Collection } from "ts-collection";
import { GripPoint } from "./GripPoint";

export abstract class Entity {
    public static ENTITY_CLOSE_POINT_TOLERANCE = 1;
    public static HOVERED_CLOSE_POINT_TOLERANCE = 15;

    public abstract getBoundingBox(): Bound2d;
    public getColor() : Color{
        return this.m_Color;
    }

    public setColor(color: Color): void {
        this.m_Color = color;
    }

    public abstract draw(ctx: CanvasRenderingContext2D): void;
    public abstract explode(): Collection<Entity>;
    public abstract getGripPoints(): GripPoint[];
    public abstract getSnapPoints(): Collection<Point2d>;
    public abstract isCloseToPos(pos: Point2d): boolean;

    public  setVisible(visible: boolean): void{
        this.m_Visible = visible;
    }
    public isVisible(): boolean {
        return this.m_Visible;
    }
    public abstract intersectWith(ent: Entity): Collection<Point2d>;
    public abstract transformBy(mat: Matrix2): void;
    
    public setSelected(selected: boolean): void {
        this.m_Selected = selected; 
    }

    public isSelected(): boolean{
        return this.m_Selected;
    }
    
    public setHover(hover: boolean, hoveredGripIndex: number = -1){
        this.m_Hover = hover;
        this.m_HoveredGripIndex = hoveredGripIndex;
    }

    public hoveredGripIndex(): number {
        return this.m_HoveredGripIndex;
    }

    public isHover(): boolean {
        return this.m_Hover;
    }

    public getHoveredGripIndex(){
        return this.m_HoveredGripIndex;
    }
    
    public abstract getAbsoluteGripPoints(): GripPoint[];
    
    public abstract getGripPos(index: number) : Point2d;

    protected m_Visible: boolean;
    protected m_Color: Color;
    protected m_Selected: boolean;
    protected m_Hover: boolean;
    protected m_HoveredGripIndex: number = -1;
}