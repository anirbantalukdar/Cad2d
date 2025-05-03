import { Point2d } from 'ts-3dge';
import { Entity } from './Entity';

export class EntityRef{
    constructor(entity: Entity, ref: number ){
        this.m_Entity = entity;
        this.m_Ref = ref; 
    }
    public m_Entity: Entity;
    public m_Ref: number;
}

export class VertexInfo {
    public m_EntityRefArray: EntityRef[] = [];
    public m_Position: Point2d;
}
export class VertexDictionary {
    public static VERTEX_CLOSE_TOLERANCE = 0.01;

    private constructor(){

    }

    public addVertex(pos: Point2d, entity: Entity, ref: number) : number{
        let index = this.getVertexIndex(pos);
        if(index !== -1){
            let vertexInfo = this.m_VertexInfoArray[index];
            let entityRefArray: EntityRef[] = vertexInfo.m_EntityRefArray;
            for(let i=0; i<entityRefArray.length; i++){
                if(entityRefArray[i].m_Entity == entity){
                    console.log('Entity already exist');
                    return -1;
                }
            }
            entityRefArray.push(new EntityRef(entity, ref));
            return index;
        }else {
            let vertexInfo = new VertexInfo();
            vertexInfo.m_Position = pos;
            vertexInfo.m_EntityRefArray.push(new EntityRef(entity, ref));
            for(let i=0; i<this.m_VertexInfoArray.length; i++){
                if(this.m_VertexInfoArray[i] == null){
                    this.m_VertexInfoArray[i] = vertexInfo;
                    return i;
                }
            }
            this.m_VertexInfoArray.push(vertexInfo);
            return this.m_VertexInfoArray.length -1;
        }
    }

    public removeEntityRef(vertex:Point2d | number, entity: Entity, ref: number){
        if(vertex instanceof Point2d){
            vertex = this.getVertexIndex(vertex);    
        }
        let vertexIndex:number = vertex;
        if(vertexIndex < 0 || vertexIndex >= this.m_VertexInfoArray.length){
            return;
        }
        let found = false;
        let vertexInfo = this.m_VertexInfoArray[vertexIndex];
        do {
            for(let i=0; i<vertexInfo.m_EntityRefArray.length; i++){
                let entityRef = vertexInfo.m_EntityRefArray[i];
                if(entity == entityRef.m_Entity && ref === entityRef.m_Ref){
                    vertexInfo.m_EntityRefArray.splice(i, 1);
                    found = true;
                }
            }                
        }while(!found);
    }

    public getVertexIndex(pos: Point2d){
        for(let i=0; i<this.m_VertexInfoArray.length; i++){
            let vertexInfo = this.m_VertexInfoArray[i];
            if(vertexInfo !== null){
                if(vertexInfo.m_Position.distanceTo(pos) < VertexDictionary.VERTEX_CLOSE_TOLERANCE){
                    return i;
                }
            }
        }
        return -1;
    }

    public getVertex(index: number){
        return this.m_VertexInfoArray[index];
    }

    public getVertexPosition(index: number){
        return this.getVertex(index).m_Position;
    }
    
    public static getInstance(): VertexDictionary {
        return VertexDictionary.INSTANCE;
    }

    private static INSTANCE = new VertexDictionary();
    private m_VertexInfoArray: VertexInfo[] = [];
}