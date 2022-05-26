/**
 * @module viw-webgl-viewer
 */
import * as THREE from 'three';
import { Viewer } from './viewer';
import { Keyboard } from './keyboard';
/**
 * Manages mouse user inputs
 */
export declare class Mouse {
    private _viewer;
    private _raycaster;
    private _inputKeyboard;
    private get camera();
    private get viewport();
    isMouseDown: Boolean;
    hasMouseMoved: Boolean;
    constructor(viewer: Viewer, keyboard: Keyboard);
    reset: () => void;
    onMouseOut: (_: any) => void;
    onMouseMove: (event: any) => void;
    onMouseWheel: (event: any) => void;
    onMouseDown: (event: any) => void;
    onMouseUp: (event: any) => void;
    onDoubleClick: (event: any) => void;
    onMouseClick: (position: THREE.Vector2, doubleClick: boolean) => void;
}
