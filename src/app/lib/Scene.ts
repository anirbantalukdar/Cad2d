import { Point2d } from "ts-3dge";
import { Entity } from "./Entity";

export class Scene {
    public static defaultCollectionName: string = 'default';
    private static tempCollectionname : string = 'temporaryItems';

    public constructor(){

    }

    public addEntity(ent: Entity){
        this.addEntityToCollection(ent, Scene.defaultCollectionName)
    }

    public getDefaultEntities(){
        let entities = this.m_EntityMap.get(Scene.defaultCollectionName);
        if(entities == null){
          entities = [];  
        }
        return entities;
    }
    
    public getTempEntities(){
        let entities = this.m_EntityMap.get(Scene.tempCollectionname);
        if(entities == null){
            entities = [];
        }
        return entities;
    }
    
    protected addEntityToCollection(ent: Entity, collection: string = 'default'): void {
        let list = this.m_EntityMap.get(collection);
        if(list == null){
            list = new Array<Entity>();
            this.m_EntityMap.set(collection, list);
        }
        list.push(ent);
    }

    public addTempEntity(ent: Entity){
        this.addEntityToCollection(ent, Scene.tempCollectionname);
    }

    public removeTempEntity(ent:Entity){
        this.removeEntityFromCollection(ent, Scene.tempCollectionname);
    }

    public removeEntityFromCollection(ent: Entity, collection: string = 'default'){
        let list = this.m_EntityMap.get(collection);
        if(list === null){
            return;
        }
        let index = list.indexOf(ent);
        list.splice(index, 1);
    }

    public getEntitiesOverPoint(pos: Point2d){
        let entities : Entity[] = [];
        let defaultEntities = this.m_EntityMap.get(Scene.defaultCollectionName);
        defaultEntities.forEach(entity => {
            if(entity.isCloseToPos(pos)){
                entities.push(entity);
            }
        })
        return entities;
    }
    
    public getSelectedEntities(): Entity[]{
        let defaultEntities = this.m_EntityMap.get(Scene.defaultCollectionName);
        let result : Entity[] = []
        defaultEntities.forEach(entity => {
            if(entity.isSelected()){
                result.push(entity)
            }
        });
        return result;
    }

    private m_EntityMap : Map<string, Array<Entity> > = new Map<string, Array<Entity>>();
}