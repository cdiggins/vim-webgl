import { ViewerSettings } from './viewerSettings';
export declare class Viewport {
    canvas: HTMLCanvasElement;
    private _unregisterResize;
    private _ownedCanvas;
    private _resizeCallbacks;
    constructor(settings: ViewerSettings);
    /**
     * Either returns html canvas at provided Id or creates a canvas at root level
     */
    private static getOrCreateCanvas;
    dispose(): void;
    /**
     * Returns the pixel size of the canvas.
     */
    getParentSize(): [width: number, height: number];
    /**
     * Returns the pixel size of the canvas.
     */
    getSize(): [width: number, height: number];
    getAspectRatio(): number;
    onResize(callback: () => void): void;
    /**
     * Set a callback for canvas resize with debouncing
     * https://stackoverflow.com/questions/5825447/javascript-event-for-canvas-resize/30688151
     * @param callback code to be called
     * @param timeout time after the last resize before code will be called
     */
    private registerResize;
}
