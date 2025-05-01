export abstract class IEventHandler {
    protected abstract onMouseOut(e: MouseEvent): void;
    protected abstract onMouseEnter(e: MouseEvent): void;
    protected abstract onMouseDown(e: MouseEvent): void;
    protected abstract onMouseMove(e: MouseEvent): void;
    protected abstract onMouseUp(e: MouseEvent): void;
    protected abstract onMouseWheel(e: WheelEvent): void;
    protected abstract onMouseClick(e: PointerEvent): void;
    
    protected abstract onKeyUp(e: KeyboardEvent): void;
    protected abstract finish(): void;
    public abstract activate(): void;
    public abstract deactivate(): void;
}