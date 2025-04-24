import { fromEvent, Observable, Subject, takeUntil } from "rxjs";
import { IEventHandler } from "./IEventHandler";
import { CanvasComponent } from "../canvas/canvas.component";

export abstract class AbstractEventHandler extends IEventHandler {
    protected canvas: CanvasComponent;
    protected mouseEnter$ : Observable<MouseEvent>;
    protected mouseOut$ : Observable<MouseEvent>;
    protected mouseDown$ : Observable<MouseEvent>;
    protected mouseUp$ : Observable<MouseEvent>;
    protected mouseMove$ : Observable<MouseEvent>;
    protected mouseWheel$: Observable<WheelEvent>;

    protected finish$ = new Subject<void>();

    protected constructor(canvas: CanvasComponent){
        super();
        this.canvas = canvas;
        let canvasHtml = canvas.getCanvas();

        this.mouseEnter$ = (fromEvent(canvasHtml, 'mouseenter') as Observable<MouseEvent>).pipe(takeUntil(this.finish$));
        this.mouseOut$ = (fromEvent(canvasHtml, 'mouseout') as Observable<MouseEvent>).pipe(takeUntil(this.finish$));
        this.mouseDown$ = (fromEvent(canvasHtml, 'mousedown') as Observable<MouseEvent>).pipe(takeUntil(this.finish$));
        this.mouseUp$ = (fromEvent(canvasHtml, 'mouseup') as Observable<MouseEvent>).pipe(takeUntil(this.finish$));
        this.mouseMove$ = (fromEvent(canvasHtml, 'mousemove') as Observable<MouseEvent>).pipe(takeUntil(this.finish$));
        this.mouseWheel$ = (fromEvent(canvasHtml, 'mousewheel') as Observable<WheelEvent>).pipe(takeUntil(this.finish$));
    }

    protected override onMouseOut(e: MouseEvent): void {
        e.preventDefault();
        e.stopPropagation();
    }

    protected override onMouseEnter(e: MouseEvent): void {
        e.preventDefault();
        e.stopPropagation();
    }

    protected override onMouseDown(e: MouseEvent): void {
        e.preventDefault();
        e.stopPropagation();
    }

    protected override onMouseMove(e: MouseEvent): void {
        e.preventDefault();
        e.stopPropagation();
    }

    protected override onMouseUp(e: MouseEvent): void {
        e.preventDefault();
        e.stopPropagation();
    }

    protected override onMouseWheel(e: WheelEvent): void {
        e.preventDefault();
        e.stopPropagation();
    }

    public override activate(){
        this.mouseEnter$.subscribe((e: MouseEvent) => {
            this.onMouseEnter(e);
        });

        this.mouseOut$.subscribe((e: MouseEvent) => {
            this.onMouseOut(e);
        });

        this.mouseMove$.subscribe((e: MouseEvent) => {
            this.onMouseMove(e);
        });

        this.mouseDown$.subscribe((e: MouseEvent) => {
            this.onMouseDown(e);
        });

        this.mouseUp$.subscribe((e: MouseEvent) => {
            this.onMouseUp(e);
        });

        this.mouseWheel$.subscribe((e: WheelEvent) => {
            this.onMouseWheel(e);
        });
    }

    public override deactivate(){
        this.finish$.next();
    }
}