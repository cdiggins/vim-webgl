/**
 * @module viw-webgl-viewer
 */
import * as THREE from 'three';
import { Renderer } from './renderer';
import { Camera } from './camera';
import { ViewerSettings } from './viewerSettings';
/**
 * Manages the camera target gizmo
 */
export declare class CameraGizmo {
    private _renderer;
    private _camera;
    private _size;
    private _fov;
    private _color;
    private _opacity;
    private _opacityAlways;
    private _fadeDurationMs;
    private _showDurationMs;
    private _box;
    private _wireframe;
    private _material;
    private _materialAlways;
    private _gizmos;
    private _timeout;
    private _fadeEnd;
    private _active;
    constructor(renderer: Renderer, camera: Camera, settings: ViewerSettings);
    dispose(): void;
    show(show?: boolean): void;
    fadeOut(fading?: boolean): void;
    setPosition(position: THREE.Vector3): void;
    setSize(size: number): void;
    setOpacity(opacity: number, opacityAlways: number): void;
    setColor(color: THREE.Color): void;
    applySettings(settings: ViewerSettings): void;
    private updateScale;
    private createGizmo;
}
