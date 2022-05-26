/**
 * @module viw-webgl-viewer
 */
import * as THREE from 'three';
import { Object } from '../vim-loader/object';
import { RenderScene } from './renderScene';
import { Viewport } from './viewport';
import { Camera } from './camera';
declare type ThreeIntersectionList = THREE.Intersection<THREE.Object3D<THREE.Event>>[];
/**
 * Highlevel aggregate of information about a raycast result
 */
export declare class RaycastResult {
    mousePosition: THREE.Vector2;
    doubleClick: boolean;
    object: Object;
    intersections: ThreeIntersectionList;
    firstHit: THREE.Intersection;
    constructor(mousePosition: THREE.Vector2, intersections: ThreeIntersectionList);
    private GetFirstVimHit;
    private getVimObjectFromHit;
    private binarySearch;
    get isHit(): boolean;
    get distance(): number;
    get position(): THREE.Vector3;
    get threeId(): number;
    get faceIndex(): number;
}
export declare class Raycaster {
    private _viewport;
    private _camera;
    private _scene;
    private _raycaster;
    constructor(viewport: Viewport, camera: Camera, scene: RenderScene);
    /**
     * Raycast projecting a ray from camera position to screen position
     */
    screenRaycast(position: THREE.Vector2): RaycastResult;
    private raycast;
}
export {};
