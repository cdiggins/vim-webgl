/**
 * @module vim-loader
 */
import * as THREE from 'three';
import { G3d } from './g3d';
import { Transparency } from './geometry';
import { Mesh } from './mesh';
import { Vim } from './vim';
/**
 * A Scene regroups many THREE.Meshes
 * It keep tracks of the global bounding box as Meshes are added
 * It keeps a map from g3d instance indices to THREE.Mesh and vice versa
 */
export declare class Scene {
    meshes: THREE.Mesh[];
    boundingBox: THREE.Box3;
    private _instanceToThreeMesh;
    private _threeMeshIdToInstances;
    /**
     * Returns the THREE.Mesh in which this instance is represented along with index
     * For merged mesh, index refers to submesh index
     * For instanced mesh, index refers to instance index.
     */
    getMeshFromInstance(instance: number): any[] | [THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>, number];
    /**
     * Returns the index of the g3d instance that from which this mesh instance was created
     * @param mesh a mesh created by the vim loader
     * @param index if merged mesh the index into the merged mesh, if instance mesh the instance index.
     * @returns a g3d instance index.
     */
    getInstanceFromMesh(mesh: THREE.Mesh, index: number): number;
    /**
     * Applies given transform matrix to all THREE.Meshes and bounding box.
     */
    applyMatrix4(matrix: THREE.Matrix4): void;
    /**
     * Sets vim index for this scene and all its THREE.Meshes.
     */
    setVim(vim: Vim): void;
    /**
     * Add an instanced mesh to the Scene and recomputes fields as needed.
     * @param mesh Is expected to have userData.instances = number[]
     * where numbers are the indices of the g3d instances that went into creating the mesh
     */
    addMergedMesh(mesh: THREE.Mesh): this;
    /**
     * Add an instanced mesh to the Scene and recomputes fields as needed.
     * @param mesh Is expected to have userData.instances = number[]
     * where numbers are the indices of the g3d instances that went into creating the mesh
     */
    addInstancedMesh(mesh: THREE.InstancedMesh): this;
    /**
     * Creates a Scene from given mesh array. Keeps a reference to the array.
     * @param meshes members are expected to have userData.instances = number[]
     * where numbers are the indices of the g3d instances that went into creating each mesh
     */
    static createFromInstancedMeshes(meshes: THREE.InstancedMesh[]): Scene;
    private registerInstancedMesh;
    /**
     * Adds the content of other Scene to this Scene and recomputes fields as needed.
     */
    merge(other: Scene): this;
    dispose(): void;
    /**
     * Computes the bounding box around all instances in world position of an InstancedMesh.
     */
    private computeIntancedMeshBoundingBox;
    /**
     * Creates a new Scene from a g3d by merging mergeble meshes and instancing instantiable meshes
     * @param transparency Specify whether color is RBG or RGBA and whether material is opaque or transparent
     * @param instances g3d instance indices to be included in the Scene. All if undefined.
     */
    static createFromG3d(g3d: G3d, transparency?: Transparency.Mode, instances?: number[] | undefined): Scene;
    /**
     * Creates a Scene from instantiable meshes from the g3d
     * @param transparency Specify whether color is RBG or RGBA and whether material is opaque or transparent
     * @param instances g3d instance indices to be included in the Scene. All if undefined.
     * @param builder optional builder to reuse the same materials
     */
    static createFromInstanciableMeshes(g3d: G3d, transparency: Transparency.Mode, instances?: number[] | undefined, builder?: Mesh.Builder): Scene;
    /**
     * Creates a Scene from mergeable meshes from the g3d
     * @param transparency Specify whether color is RBG or RGBA and whether material is opaque or transparent
     * @param instances g3d instance indices to be included in the Scene. All if undefined.
     * @param builder optional builder to reuse the same materials
     */
    static createFromMergeableMeshes(g3d: G3d, transparency: Transparency.Mode, instances?: number[] | undefined, builder?: Mesh.Builder): Scene;
}
