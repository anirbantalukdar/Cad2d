import { Point2d } from "ts-3dge";
import { GripPoint } from "./GripPoint";
import { VertexDictionary } from "./VertexDictionary";
import { Entity } from "./Entity";

export class IndexedGripPoint extends GripPoint {
    constructor(dictIndex: number){
        super();
        this.m_DictIndex = dictIndex;
    }

    public override moveGripPointTo(pos: Point2d): void {
        let vDict = VertexDictionary.getInstance();
        vDict.moveVertexTo(this.m_DictIndex, pos);
    }

    public override getPosition(): Point2d {
        let vDict = VertexDictionary.getInstance();
        return vDict.getVertexPosition(this.m_DictIndex);
    }

    public override isVisible(): boolean {
        let vDict = VertexDictionary.getInstance();
        return vDict.selectedEntityList(this.m_DictIndex).length > 0;
    }

    public override isHovered(): boolean {
        let vDict = VertexDictionary.getInstance();
        return vDict.isHoveredVertex(this.m_DictIndex);
    }

    public override isLocked(): boolean {
        return false;
    }

    public override getRefNo(entity: Entity): number {
        let vDict = VertexDictionary.getInstance();
        return vDict.getVertexRef(this.m_DictIndex, entity)
    }
    protected m_DictIndex: number;
}