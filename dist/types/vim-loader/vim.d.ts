/**
 * @module vim-loader
 */
import * as THREE from 'three';
import { Document } from './document';
import { Scene } from './scene';
import { VimSettings } from './vimSettings';
import { Object } from './object';
/**
 * Container for the built three meshes and the vim data from which it was built.
 * Dispenses Objects for high level scene manipulation
 */
export declare class Vim {
    document: Document;
    scene: Scene;
    settings: VimSettings;
    index: number;
    private _elementToObject;
    constructor(vim: Document, scene: Scene);
    dispose(): void;
    /**
     * Reloads the vim with only the instances provided
     * @param instances g3d instance indices to keep
     */
    filter(instances?: number[]): void;
    /**
     * Applies new settings to the vim
     */
    applySettings(settings: VimSettings): void;
    /**
     * Returns vim matrix
     */
    getMatrix(): THREE.Matrix4;
    /**
     * Returns vim object from given mesh and index
     * @param mesh three mesh
     * @param index instanced mesh index or merged mesh submesh index
     */
    getObjectFromMesh(mesh: THREE.Mesh, index: number): Object;
    /**
     * Returns vim object from given instance
     * @param instance g3d instance index
     */
    getObjectFromInstance(instance: number): Object;
    /**
     * Returns vim object from given vim element Id
     * @param id vim element Id
     */
    getObjectsFromElementId(id: number): Object[];
    /**
     * Returns vim object from given vim element index
     * @param element vim element index
     */
    getObjectFromElementIndex(element: number): Object;
    private getMeshesFromElement;
    private getMeshesFromInstances;
    /**
     * Get the element index related to given mesh
     * @param mesh instanced mesh
     * @param index index into the instanced mesh
     * @returns index of element
     */
    private getElementFromMesh;
}
