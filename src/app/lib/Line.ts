import { Bound2d, Point2d, Vector2d, Matrix2 } from "ts-3dge";
import { Collection } from "ts-collection";
import { Entity } from "./Entity";

export class Line extends Entity {
    public constructor(startPt: Point2d = Point2d.kOrigin, endPt: Point2d = Point2d.kOrigin){
        super();
        this.m_startPoint = new Point2d(startPt);
        this.m_endPoint = new Point2d(endPt);
    }

    public override getBoundingBox(): Bound2d {
        throw new Error("Method not implemented.");
    }
    public override draw(ctx: CanvasRenderingContext2D): void {
        let oldStroke = ctx.strokeStyle;
        ctx.strokeStyle = 'teal';
        if(this.isHover()){
            ctx.strokeStyle = 'cyan';            
        }
        ctx.beginPath(); 
        ctx.moveTo(this.m_startPoint.x, this.m_startPoint.y); 
        ctx.lineTo(this.m_endPoint.x, this.m_endPoint.y); 
        ctx.stroke(); 

        this.m_Selected = true;
        if(this.m_Selected){
            this.drawGripPoints(ctx);
        }
        ctx.strokeStyle = oldStroke;
    }

    public length(): number{
        return this.m_startPoint.distanceTo(this.m_endPoint);
    }

    public override isCloseToPos(pos: Point2d): boolean {
        return (this.m_startPoint.distanceTo(pos) + this.m_endPoint.distanceTo(pos) - this.length()) < Entity.ENTITY_CLOSE_POINT_TOLERANCE;
    }

    public override explode(): Collection<Entity> {
        throw new Error("Method not implemented.");
    }
    
    public override getGripPoints(): Point2d[] {
        return [this.m_startPoint, this.m_endPoint];
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
    
    public setStartPoint(pt: Point2d){
        this.m_startPoint.set(pt.x, pt.y);
    }

    public setEndPoint(pt: Point2d){
        this.m_endPoint.set(pt.x, pt.y);
    }

    public getStartPoint(): Point2d {
        return new Point2d(this.m_startPoint);
    }

    public getEndPoint(): Point2d {
        return new Point2d(this.m_endPoint);
    }
    
    protected m_startPoint: Point2d;
    protected m_endPoint: Point2d;
}