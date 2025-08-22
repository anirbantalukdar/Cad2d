import { Bound2d, Point2d, Vector2d, Matrix2 } from "ts-3dge";
import { Collection, IllegalArgumentException } from "ts-collection";
import { Entity } from "./Entity";
import { VertexDictionary } from "./VertexDictionary";
import { GripPoint } from "./GripPoint";
import { IndexedGripPoint } from "./IndexedGripPoint";
import { AbsoluteGripPoint } from "./AbsoluteGripPoint";
import { LineMidGripPoint } from "./LineMidGripPoint";

export class Line extends Entity {
    public constructor(startPt: Point2d = Point2d.kOrigin, endPt: Point2d = Point2d.kOrigin){
        super();
        this.m_EndGripPoint = null;
        this.m_StartGripPoint = null;
        let vDict = VertexDictionary.getInstance();
        this.m_startPointIndex = vDict.addVertex(startPt, this, 0);
        this.m_endPointIndex = vDict.addVertex(endPt, this, 2);
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
        ctx.moveTo(this.getStartPoint().x, this.getStartPoint().y); 
        ctx.lineTo(this.getEndPoint().x, this.getEndPoint().y); 
        ctx.stroke(); 

        ctx.strokeStyle = oldStroke;
    }

    public override getAbsoluteGripPoints(): GripPoint[] {
        return [new AbsoluteGripPoint(this, 1)];
    }

    public length(): number{
        return this.getStartPoint().distanceTo(this.getEndPoint());
    }

    public override isCloseToPos(pos: Point2d): boolean {
        return (this.getStartPoint().distanceTo(pos) + this.getEndPoint().distanceTo(pos) - this.length()) < Entity.ENTITY_CLOSE_POINT_TOLERANCE;
    }

    public override explode(): Collection<Entity> {
        throw new Error("Method not implemented.");
    }
    
    public override getGripPoints(): GripPoint[] {
        if(this.m_StartGripPoint == null || this.m_EndGripPoint == null){
            this.m_StartGripPoint = new IndexedGripPoint(this.m_startPointIndex);
            this.m_EndGripPoint = new IndexedGripPoint(this.m_endPointIndex);
        }
        return [this.m_StartGripPoint, new LineMidGripPoint(this, 1), this.m_EndGripPoint];
    }

    public override getSnapPoints(): Collection<Point2d> {
        throw new Error("Method not implemented.");
    }
    public override setVisible(visible: boolean): void {
        throw new Error("Method not implemented.");
    }
    public override intersectWith(ent: Entity): Collection<Point2d> {
        throw new Error("Method not implemented.");
    }

    public override transformBy(mat: Matrix2): void {
        let startPt = new Point2d(this.getStartPoint());
        startPt.transformBy(mat);
        let endPt = new Point2d(this.getEndPoint());
        endPt.transformBy(mat);
        //this.setStartPoint(startPt);
        //this.setEndPoint(endPt);
    }
    
    public getGripPos(index: number): Point2d {
        let vDict = VertexDictionary.getInstance();
        switch(index){
            case 0:
                return vDict.getVertex(this.m_startPointIndex).m_Position;
            case 1:
                let startPos = vDict.getVertex(this.m_startPointIndex).m_Position;
                let endPos = vDict.getVertex(this.m_endPointIndex).m_Position;
                return new Point2d((startPos.x + endPos.x)/2, (startPos.y + endPos.y)/2);
            case 2:
                return vDict.getVertex(this.m_endPointIndex).m_Position;
            default:
                throw new IllegalArgumentException("Line Grip Point illegal index: " + index);
        }
    }

    public setStartPoint(pt: Point2d){
        console.log('Setting start Point');
        let vDict = VertexDictionary.getInstance();
        if(this.m_startPointIndex != -1){
            vDict.removeEntityRef(this.m_startPointIndex, this, 0);
        }
        this.m_startPointIndex = -1;
        if(pt != null){
            this.m_startPointIndex = vDict.addVertex(pt, this, 0);
        }
    }

    public setEndPoint(pt: Point2d){
        console.log('Setting end Point');
        let vDict = VertexDictionary.getInstance();
        if(this.m_endPointIndex != -1){
            vDict.removeEntityRef(this.m_endPointIndex, this, 1);
        }
        this.m_endPointIndex = -1;
        if(pt != null){
            this.m_endPointIndex = vDict.addVertex(pt, this, 1);
        }
    }

    public getStartPoint(): Point2d {
        let vDict = VertexDictionary.getInstance();
        return new Point2d(vDict.getVertexPosition(this.m_startPointIndex));
    }

    public getEndPoint(): Point2d {
        let vDist = VertexDictionary.getInstance();
        return new Point2d(vDist.getVertexPosition(this.m_endPointIndex));
    }
    
    public getMidPoint(): Point2d {
        let startPoint = this.getStartPoint();
        let endPoint = this.getEndPoint();
        let lineVec = endPoint.subtract(startPoint);
        return new Point2d(startPoint).addVector(lineVec.multiplyBy(0.5));
    }

    protected m_startPointIndex: number;
    protected m_endPointIndex: number;
    protected m_StartGripPoint: GripPoint;
    protected m_EndGripPoint: GripPoint;
}