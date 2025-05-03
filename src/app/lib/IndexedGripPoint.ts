import { Point2d } from "ts-3dge";
import { GripPoint } from "./GripPoint";
import { VertexDictionary } from "./VertexDictionary";
import { Entity } from "./Entity";

export class IndexedGripPoint extends GripPoint {
    constructor(entity: Entity, gripRef: number, dictIndex: number){
        super(entity, gripRef);
        this.m_DictIndex = dictIndex;
    }

    public override moveGripPointTo(pos: Point2d): void {
    }

    protected m_DictIndex: number;
}