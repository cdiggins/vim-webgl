/**
 * @module vim-loader
 */
import * as THREE from 'three';
export declare namespace Materials {
    /**
     * Defines the materials to be used by the vim loader and allows for material injection.
     */
    class Library {
        opaque: THREE.Material;
        transparent: THREE.Material | undefined;
        wireframe: THREE.LineBasicMaterial | undefined;
        constructor(opaque?: THREE.Material, transparent?: THREE.Material, wireframe?: THREE.LineBasicMaterial);
        dispose(): void;
    }
    /**
     * Creates a non-custom instance of phong material as used by the vim loader
     * @returns a THREE.MeshPhongMaterial
     */
    function createBase(): THREE.MeshPhongMaterial;
    /**
     * Creates a new instance of the default opaque material used by the vim-loader
     * @returns a THREE.MeshPhongMaterial
     */
    function createOpaque(): THREE.MeshPhongMaterial;
    /**
     * Creates a new instance of the default loader transparent material
     * @returns a THREE.MeshPhongMaterial
     */
    function createTransparent(): THREE.MeshPhongMaterial;
    /**
     * Adds feature to default three material to support color change.
     * Developed and tested for Phong material, but might work for other materials.
     */
    function patchMaterial(material: THREE.Material): void;
    /**
     * Patches phong shader to be able to control when lighting should be applied to resulting color.
     * Instanced meshes ignore light when InstanceColor is defined
     * Instanced meshes ignore vertex color when instance attribute useVertexColor is 0
     * Regular meshes ignore light in favor of vertex color when uv.y = 0
     */
    function patchShader(shader: THREE.Shader): THREE.Shader;
    /**
     * Creates a new instance of the default wireframe material
     * @returns a THREE.LineBasicMaterial
     */
    function createWireframe(): THREE.LineBasicMaterial;
    /**
     * Get or create a singleton material library with default materials
     */
    function getDefaultLibrary(): Library;
    /**
     * Disposes the singleton material library
     */
    function dispose(): void;
}
