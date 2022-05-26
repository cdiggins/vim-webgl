/**
 * @module viw-webgl-viewer
 */
import * as THREE from 'three';
import { ViewerSettings } from './viewerSettings';
import { Box3 } from 'three';
/**
 * Manages the THREE.Mesh for the ground plane under the vims
 */
export declare class GroundPlane {
    mesh: THREE.Mesh;
    private _source;
    private _size;
    private _geometry;
    private _material;
    private _texture;
    constructor();
    applyViewerSettings(settings: ViewerSettings): void;
    adaptToContent(box: THREE.Box3): void;
    applyTexture(texUrl: string): void;
    dispose(): void;
}
/**
 * Manages ground plane and lights that are part of the THREE.Scene to render but not part of the Vims.
 */
export declare class Environment {
    skyLight: THREE.HemisphereLight;
    sunLight: THREE.DirectionalLight;
    private _groundPlane;
    get groundPlane(): THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;
    constructor(settings: ViewerSettings);
    /**
     * Returns all three objects composing the environment
     */
    getObjects(): THREE.Object3D[];
    applySettings(settings: ViewerSettings): void;
    /**
     * Adjust scale so that it matches box dimensions.
     */
    adaptToContent(box: Box3): void;
    dispose(): void;
}
export interface IEnvironment {
    skyLight: THREE.HemisphereLight;
    sunLight: THREE.DirectionalLight;
    groundPlane: THREE.Mesh;
}
