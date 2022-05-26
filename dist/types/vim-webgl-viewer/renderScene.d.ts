import * as THREE from 'three';
import { Scene } from '../vim-loader/scene';
export declare class RenderScene {
    scene: THREE.Scene;
    private _scenes;
    private _boundingBox;
    constructor();
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
    private addScene;
    private removeScene;
}
