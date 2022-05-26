/**
 * @module vim-loader
 */
import * as THREE from 'three';
import { G3d } from './g3d';
import { Transparency } from './geometry';
import { Materials } from './materials';
export declare namespace Mesh {
    /**
     * Builds meshes from the g3d and BufferGeometry
     * Allows to reuse the same material for all new built meshes
     */
    class Builder {
        materials: Materials.Library;
        constructor(materials?: Materials.Library);
        /**
         * Creates Instanced Meshes from the g3d data
         * @param transparency Specify wheter color is RBG or RGBA and whether material is opaque or transparent
         * @param instances instance indices from the g3d for which meshes will be created.
         *  If undefined, all multireferenced meshes will be created.
         * @returns an array of THREE.InstancedMesh
         */
        createInstancedMeshes(g3d: G3d, transparency: Transparency.Mode, instances?: number[]): THREE.InstancedMesh[];
        /**
         * Creates a InstancedMesh from g3d data and given instance indices
         * @param geometry Geometry to use in the mesh
         * @param instances Instance indices for which matrices will be applied to the mesh
         * @param useAlpha Specify whether to use RGB or RGBA
         * @returns a THREE.InstancedMesh
         */
        createInstancedMesh(geometry: THREE.BufferGeometry, g3d: G3d, instances: number[], useAlpha: boolean): THREE.InstancedMesh<THREE.BufferGeometry, THREE.Material>;
        /**
         * Create a merged mesh from g3d instance indices
         * @param transparency Specify wheter color is RBG or RGBA and whether material is opaque or transparent
         * @param instances g3d instance indices to be included in the merged mesh. All mergeable meshes if undefined.
         * @returns a THREE.Mesh
         */
        createMergedMesh(g3d: G3d, transparency: Transparency.Mode, instances?: number[]): THREE.Mesh;
        /**
         * Create a wireframe mesh from g3d instance indices
         * @param instances g3d instance indices to be included in the merged mesh. All mergeable meshes if undefined.
         * @returns a THREE.Mesh
         */
        createWireframe(g3d: G3d, instances: number[]): THREE.LineSegments<THREE.WireframeGeometry<THREE.BufferGeometry>, THREE.LineBasicMaterial>;
    }
    function getDefaultBuilder(): Builder;
    function dispose(): void;
}
