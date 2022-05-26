/**
 * @module vim-loader
 */
import * as THREE from 'three';
import { Vim } from './vim';
/**
 * High level api to interact with the loaded vim geometry and data.
 */
export declare class Object {
    vim: Vim;
    element: number;
    instances: number[];
    private _color;
    private _visible;
    private _boundingBox;
    private _meshes;
    constructor(vim: Vim, element: number, instances: number[], meshes: [THREE.Mesh, number][]);
    get hasMesh(): number;
    /**
     * Internal - Replace this object meshes and apply color as needed.
     */
    updateMeshes(meshes: [THREE.Mesh, number][]): void;
    /**
     * Returns Bim data for the element associated with this object.
     */
    getBimElement(): any;
    get elementId(): number;
    /**
     * returns the bounding box of the object from cache or computed if needed.
     * Returns undefined if object has no geometry.
     */
    getBoundingBox(): THREE.Box3;
    /**
     * Returns the center position of this object
     * @param target Vector3 where to copy data. A new instance is created if none provided.
     * Returns undefined if object has no geometry.
     */
    getCenter(target?: THREE.Vector3): THREE.Vector3;
    /**
     * returns the bounding sphere of the object from cache or computed if needed.
     * Returns undefined if object has no geometry.
     */
    getBoundingSphere(target?: THREE.Sphere): THREE.Sphere;
    /**
     * Creates a new three wireframe Line object from the object geometry
     */
    createWireframe(): THREE.LineSegments<THREE.WireframeGeometry<THREE.BufferGeometry>, THREE.LineBasicMaterial>;
    /**
     * Creates a new THREE.BufferGeometry for this object
     * Returns undefined if object has no geometry.
     */
    createGeometry(): THREE.BufferGeometry;
    /**
     * Changes the display color of this object.
     * @param color Color to apply, undefined to revert to default color.
     */
    get color(): THREE.Color | undefined;
    set color(color: THREE.Color | undefined);
    private applyColor;
    /**
     * Toggles visibility of this object.
     * @param value true to show object, false to hide object.
     */
    get visible(): boolean;
    set visible(value: boolean);
    private applyVisible;
    /**
     * @param index index of the merged mesh instance
     * @returns inclusive first index of the index buffer related to given merged mesh index
     */
    private getMergedMeshStart;
    /**
     * @param index index of the merged mesh instance
     * @returns return the last+1 index of the index buffer related to given merged mesh index
     */
    private getMergedMeshEnd;
    /**
     * Writes new color to the appropriate section of merged mesh color buffer.
     * @param index index of the merged mesh instance
     * @param color rgb representation of the color to apply
     */
    private applyMergedVisible;
    /**
     * Adds an ignoreInstance buffer to the instanced mesh and sets values to 1 to hide instances
     * @param index index of the instanced instance
     */
    private applyInstancedVisible;
    /**
     * Writes new color to the appropriate section of merged mesh color buffer.
     * @param index index of the merged mesh instance
     * @param color rgb representation of the color to apply
     */
    private applyMergedColor;
    /**
     * Repopulates the color buffer of the merged mesh from original g3d data.
     * @param index index of the merged mesh instance
     */
    private resetMergedColor;
    /**
     * Adds an instanceColor buffer to the instanced mesh and sets new color for given instance
     * @param index index of the instanced instance
     * @param color rgb representation of the color to apply
     */
    private applyInstancedColor;
    private getOrAddInstanceColorAttribute;
    private getOrAddColoredAttribute;
}
