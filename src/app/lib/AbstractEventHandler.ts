import { fromEvent, Observable, Subject, takeUntil } from "rxjs";
import { IEventHandler } from "./IEventHandler";
import { CanvasComponent } from "../canvas/canvas.component";
import { Point2d } from "ts-3dge";

export abstract class AbstractEventHandler extends IEventHandler {
    protected canvas: CanvasComponent;
    protected mouseEnter$ : Observable<MouseEvent>;
    protected mouseOut$ : Observable<MouseEvent>;
    protected mouseDown$ : Observable<MouseEvent>;
    protected mouseUp$ : Observable<MouseEvent>;
    protected mouseMove$ : Observable<MouseEvent>;
    protected mouseWheel$: Observable<WheelEvent>;
    protected mouseClick$: Observable<PointerEvent>;
    protected keyUp$ : Observable<KeyboardEvent>;

    protected finish$ = new Subject<void>();

    protected dragStartPt: Point2d;

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
        this.mouseClick$ = (fromEvent(canvasHtml, 'click') as Observable<PointerEvent>).pipe(takeUntil(this.finish$));
        document.addEventListener('keyup', (e: KeyboardEvent) => {
            this.onKeyUp(e);
        })
        //this.keyUp$ = (fromEvent(canvasHtml, 'keyup') as Observable<KeyboardEvent>).pipe(takeUntil(this.finish$));
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

        if(e.button === 1){
            this.dragStartPt = this.canvas.toPoint(e);
        }
    }

    protected override onKeyUp(e: KeyboardEvent): void {
        e.preventDefault();
        e.stopPropagation();
    }

    protected override onMouseMove(e: MouseEvent): void {
        e.preventDefault();
        e.stopPropagation();

        if(this.dragStartPt == null){
            return;
        }
        const dragEnd = this.canvas.toPoint(e);

        const dx = dragEnd.x - this.dragStartPt.x;
        const dy = dragEnd.y - this.dragStartPt.y;

        this.canvas.translate(dx, dy);
        this.canvas.redraw();
    }

    protected override onMouseUp(e: MouseEvent): void {
        e.preventDefault();
        e.stopPropagation();
        if(e.button === 1){
            this.dragStartPt = null;
        }
    }

    protected override onMouseClick(e: PointerEvent) : void {
        e.preventDefault();
        e.stopPropagation();
    }

    protected override onMouseWheel(e: WheelEvent): void {
        e.preventDefault();
        e.stopPropagation();

        const zoomCenter = this.canvas.toPoint(e);
        const factor = Math.sign(e.deltaY) > 0 ? 0.9 : 1.1;

        this.canvas.translate(zoomCenter.x, zoomCenter.y);
        this.canvas.scale(factor);
        this.canvas.translate(-zoomCenter.x, -zoomCenter.y);

        this.canvas.redraw();
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

        this.mouseClick$.subscribe((e: PointerEvent) => {
            this.onMouseClick(e);
        });

        this.mouseWheel$.subscribe((e: WheelEvent) => {
            this.onMouseWheel(e);
        });

        //this.keyUp$.subscribe((e: KeyboardEvent) => {
         //   this.onKeyUp(e);
        //});
    }

    public override finish(): void {
    
    }
    
    public override deactivate(){
        this.finish$.next();
    }
}