export abstract class IEventHandler {
    protected abstract onMouseOut(e: MouseEvent): void;
    protected abstract onMouseEnter(e: MouseEvent): void;
    protected abstract onMouseDown(e: MouseEvent): void;
    protected abstract onMouseMove(e: MouseEvent): void;
    protected abstract onMouseUp(e: MouseEvent): void;
    protected abstract onMouseWheel(e: WheelEvent): void;

    public abstract activate(): void;
    public abstract deactivate(): void;
}