/**
 * @module viw-webgl-viewer
 */
import { Viewer } from './viewer';
/**
 * Manages and registers all viewer user inputs for mouse, keyboard and touch
 */
export declare class Input {
    private _canvas;
    private _unregisters;
    private _touch;
    private _mouse;
    private _keyboard;
    constructor(viewer: Viewer);
    private reg;
    /**
     * Register inputs handlers for default viewer behavior
     */
    register(): void;
    /**
     * Unregisters all input handlers
     */
    unregister: () => void;
    /**
     * Resets all input state
     */
    reset(): void;
}
