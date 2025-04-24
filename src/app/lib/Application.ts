import { Scene } from "./Scene";

export class Application {
    private constructor(){

    }

    public setCanvas(canvas: HTMLCanvasElement){
        this.m_Canvas = canvas; 
    }

    public getCanvas(): HTMLCanvasElement {
        return this.m_Canvas;
    }

    public getRenderingContext(): CanvasRenderingContext2D{
        if(this.m_Canvas != null){
            if(this.m_RenderingContext2d == null){
                this.m_RenderingContext2d = this.m_Canvas.getContext('2d');
            }
            return this.m_RenderingContext2d;
        }
        return null;
    }
    
    public getScene(): Scene {
        return this.m_Scene;
    }
    
    public static getInstance(): Application {
        return Application.INSTANCE;
    }

    private static INSTANCE = new Application();
    private m_Canvas : HTMLCanvasElement = null;
    private m_RenderingContext2d : CanvasRenderingContext2D = null;
    private m_Scene : Scene = null;//new Scene();
}