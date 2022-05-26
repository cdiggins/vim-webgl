/**
 * @module viw-webgl-viewer
 */
import * as THREE from 'three';
import { Scene } from '../vim-loader/scene';
import { Viewport } from './viewport';
import { RenderScene } from './renderScene';
/**
 * Manages how vim objects are added and removed from the THREE.Scene to be rendered
 */
export declare class Renderer {
    renderer: THREE.WebGLRenderer;
    viewport: Viewport;
    scene: RenderScene;
    constructor(scene: RenderScene, viewport: Viewport);
    dispose(): void;
    /**
     * Returns the bounding sphere encompasing all rendererd objects.
     * @param target sphere in which to copy result, a new instance is created if undefined.
     */
    getBoundingSphere(target?: THREE.Sphere): THREE.Sphere;
    /**
     * Returns the bounding box encompasing all rendererd objects.
     * @param target box in which to copy result, a new instance is created if undefined.
     */
    getBoundingBox(target?: THREE.Box3): THREE.Box3;
    /**
     * Render what is in camera.
     */
    render(camera: THREE.Camera): void;
    /**
     * Add object to be rendered
     */
    add(target: Scene | THREE.Object3D): void;
    /**
     * Remove object from rendering
     */
    remove(target: Scene | THREE.Object3D): void;
    /**
     * Removes all rendered objects
     */
    clear(): void;
    private fitViewport;
}
