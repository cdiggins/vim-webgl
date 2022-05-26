/**
 * @module vim-loader
 */
import * as THREE from 'three';
import { G3d } from './g3d';
export declare namespace Transparency {
    /**
     * Determines how to draw (or not) transparent and opaque objects
     */
    type Mode = 'opaqueOnly' | 'transparentOnly' | 'allAsOpaque' | 'all';
    /**
     * Returns true if the transparency mode is one of the valid values
     */
    function isValid(value: string): value is Mode;
    /**
     * Returns true if the transparency mode requires to use RGBA colors
     */
    function requiresAlpha(mode: Mode): boolean;
    /**
     * Returns true if the transparency mode requires using meshes of given opacity
     */
    function match(mode: Mode, transparent: boolean): boolean;
}
export declare namespace Geometry {
    /**
     * Creates a BufferGeometry with all given instances merged
     * @param instances indices of the instances from the g3d to merge
     * @returns a BufferGeometry
     */
    function createGeometryFromInstances(g3d: G3d, instances: number[]): THREE.BufferGeometry;
    /**
     * Creates a BufferGeometry from a given mesh index in the g3d
     * @param mesh g3d mesh index
     * @param useAlpha specify to use RGB or RGBA for colors
     */
    function createGeometryFromMesh(g3d: G3d, mesh: number, useAlpha: boolean): THREE.BufferGeometry;
    /**
     * Helper to merge many instances/meshes from a g3d direcly into a BufferGeometry
     */
    class Merger {
        private _g3d;
        private _colorSize;
        private _meshes;
        private _indices;
        private _vertices;
        private _colors;
        private _instances;
        private _submeshes;
        constructor(g3d: G3d, transparency: Transparency.Mode, instances: number[], meshes: number[], indexCount: number, vertexCount: number);
        getInstances: () => number[];
        getSubmeshes: () => number[];
        /**
         * Prepares a merge of all meshes referenced by only one instance.
         */
        static createFromUniqueMeshes(g3d: G3d, transparency: Transparency.Mode): Merger;
        /**
         * Prepares a merge of all meshes referenced by given instances.
         */
        static createFromInstances(g3d: G3d, instances: number[], transparency: Transparency.Mode): Merger;
        /**
         * Concatenates the arrays of each of the (instance,matrix) pairs into large arrays
         * Vertex position is transformed with the relevent matrix at it is copied
         * Index is offset to match the vertices in the concatenated vertex buffer
         * Color is expanded from submehes to vertex color into a concatenated array
         * Returns a BufferGeometry from the concatenated array
         */
        private merge;
        /**
         * Runs the merge process and return the resulting BufferGeometry
         */
        toBufferGeometry(): THREE.BufferGeometry;
    }
    /**
     * Creates a BufferGeometry from given geometry data arrays
     * @param vertices vertex data with 3 number per vertex (XYZ)
     * @param indices index data with 3 indices per face
     * @param vertexColors color data with 3 or 4 number per vertex. RBG or RGBA
     * @param colorSize specify whether to treat colors as RGB or RGBA
     * @returns a BufferGeometry
     */
    function createGeometryFromArrays(vertices: Float32Array, indices: Uint32Array, vertexColors?: Float32Array | undefined, colorSize?: number): THREE.BufferGeometry;
    /**
     * Returns a THREE.Matrix4 from the g3d for given instance
     * @param instance g3d instance index
     * @param target matrix where the data will be copied, a new matrix will be created if none provided.
     */
    function getInstanceMatrix(g3d: G3d, instance: number, target?: THREE.Matrix4): THREE.Matrix4;
}
