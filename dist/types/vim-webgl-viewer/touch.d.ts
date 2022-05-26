/**
 * @module viw-webgl-viewer
 */
import * as THREE from 'three';
import { Mouse } from './mouse';
import { Viewer } from './viewer';
/**
 * Manages user touch inputs.
 */
export declare class Touch {
    TAP_DURATION_MS: number;
    private _viewer;
    private _mouse;
    private get camera();
    private get viewport();
    private _touchStart;
    private _touchStart1;
    private _touchStart2;
    private _touchStartTime;
    constructor(viewer: Viewer, mouse: Mouse);
    reset: () => void;
    private onTap;
    onTouchStart: (event: any) => void;
    onDrag: (delta: THREE.Vector2) => void;
    onDoubleDrag: (delta: THREE.Vector2) => void;
    onPinchOrSpread: (delta: number) => void;
    onTouchMove: (event: any) => void;
    onTouchEnd: (_: any) => void;
    private isSingleTouch;
    private touchToVector;
    private average;
}
