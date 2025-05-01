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

    public addVertex(pos: Point2d, entity: Entity, ref: number){
        let index = this.getVertexIndex(pos);
        if(index !== -1){
            let vertexInfo = this.m_VertexInfoArray[index];
            let entityRefArray: EntityRef[] = vertexInfo.m_EntityRefArray;
            for(let i=0; i<entityRefArray.length; i++){
                if(entityRefArray[i].m_Entity == entity){
                    console.log('Entity already exist');
                    return;
                }
            }
            entityRefArray.push(new EntityRef(entity, ref));
        }else {
            let vertexInfo = new VertexInfo();
            vertexInfo.m_Position = pos;
            vertexInfo.m_EntityRefArray.push(new EntityRef(entity, ref));
            for(let i=0; i<this.m_VertexInfoArray.length; i++){
                if(this.m_VertexInfoArray[i] == null){
                    this.m_VertexInfoArray[i] = vertexInfo;
                    return;
                }
            }
            this.m_VertexInfoArray.push(vertexInfo);
        }
    }

    public removeEntityRef(entity: Entity){
        for(let i=0; i<this.m_VertexInfoArray.length; i++){
            let vertexInfo = this.m_VertexInfoArray[i];
            let found = false;
            do {
                for(let j=0; j<vertexInfo.m_EntityRefArray.length; j++){
                    if(entity == vertexInfo.m_EntityRefArray[j].m_Entity){
                        vertexInfo.m_EntityRefArray.splice(j, 1);
                        found = true;
                    }
                }                
            }while(!found);
            if(vertexInfo.m_EntityRefArray.length == 0){
                this.m_VertexInfoArray[i] = null;
            }
        }
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

    public static getInstance(): VertexDictionary {
        return VertexDictionary.INSTANCE;
    }

    private static INSTANCE = new VertexDictionary();
    private m_VertexInfoArray: VertexInfo[] = [];
}