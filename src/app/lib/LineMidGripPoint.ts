import { Matrix2, Point2d } from "ts-3dge";
import { AbsoluteGripPoint } from "./AbsoluteGripPoint";
import { Entity } from "./Entity";
import { Line } from "./Line";

export class LineMidGripPoint extends AbsoluteGripPoint {
    constructor(entity: Entity, gripRef: number){
        super(entity, gripRef);
    }

    public override moveGripPointTo(pos: Point2d): void {        
        let line : Line = this.m_Entity as Line;
        let currMidPoint = line.getMidPoint();

        let moveVec = pos.subtract(currMidPoint);

        let mat = new Matrix2();
        mat.translateBy(moveVec.x, moveVec.y);
        console.log('Transforming line by', moveVec);
        line.transformBy(mat);
    }
}