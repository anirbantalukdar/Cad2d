import { Map, ArrayList, Collection, TreeMap, List } from "ts-collection";
import { Entity } from "./Entity";

export class Scene {
    public static defaultCollectionName: string = 'default';
    public constructor(){

    }

    public addEntity(ent: Entity){
        this.addEntityToCollection(ent, Scene.defaultCollectionName)
    }

    protected addEntityToCollection(ent: Entity, collection: string = 'default'): void {
        let list = this.m_EntityMap.get(collection);
        if(list == null){
            list = new ArrayList<Entity>();
            this.m_EntityMap.put(collection, list);
        }
        list.add(ent);
    }

    private m_EntityMap : Map<string, List<Entity> > = new TreeMap<string, ArrayList<Entity>>();
}