import { Point2d } from "ts-3dge";
import { Line } from "./Line";

export class TemporaryLine extends Line {
    constructor(startPt: Point2d, endPt: Point2d){
        super();
        this.m_startPt = startPt;
        this.m_endPt = endPt;
    }

    public override getStartPoint(): Point2d {
        return this.m_startPt;
    }

    public override getEndPoint(): Point2d {
        return this.m_endPt;
    }

    public override setStartPoint(pt: Point2d): void {
        this.m_startPt = pt;
    }

    public override setEndPoint(pt: Point2d): void {
        this.m_endPt = pt;
    }

    private m_startPt : Point2d;
    private m_endPt: Point2d;

}