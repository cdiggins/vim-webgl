/**
 * @module vim-loader
 */
import { BFast } from './bfast';
declare class G3dAttributeDescriptor {
    description: string;
    association: string;
    semantic: string;
    attributeTypeIndex: string;
    dataType: string;
    dataArity: number;
    constructor(description: string, association: string, semantic: string, attributeTypeIndex: string, dataType: string, dataArity: string);
    static fromString(descriptor: string): G3dAttributeDescriptor;
    matches(other: G3dAttributeDescriptor): boolean;
}
declare class G3dAttribute {
    descriptor: G3dAttributeDescriptor;
    bytes: Uint8Array;
    data: Uint8Array | Int16Array | Int32Array | Float32Array | Float64Array;
    constructor(descriptor: G3dAttributeDescriptor, bytes: Uint8Array);
    static fromString(descriptor: string, buffer: Uint8Array): G3dAttribute;
    static castData(bytes: Uint8Array, dataType: string): Uint8Array | Int16Array | Int32Array | Float32Array | Float64Array;
}
/**
 * G3D is a simple, efficient, generic binary format for storing and transmitting geometry.
 * The G3D format is designed to be used either as a serialization format or as an in-memory data structure.
 * See https://github.com/vimaec/g3d
 */
declare class AbstractG3d {
    meta: string;
    attributes: G3dAttribute[];
    constructor(meta: string, attributes: G3dAttribute[]);
    findAttribute(descriptor: string): G3dAttribute | undefined;
    static createFromBfast(bfast: BFast): AbstractG3d;
}
/**
 * G3D is a simple, efficient, generic binary format for storing and transmitting geometry.
 * The G3D format is designed to be used either as a serialization format or as an in-memory data structure.
 * A G3d with specific attributes according to the VIM format specification.
 * See https://github.com/vimaec/vim#vim-geometry-attributes for the vim specification.
 * See https://github.com/vimaec/g3d for the g3d specification.
 */
export declare class G3d {
    positions: Float32Array;
    indices: Uint32Array;
    instanceMeshes: Int32Array;
    instanceTransforms: Float32Array;
    meshSubmeshes: Int32Array;
    submeshIndexOffset: Int32Array;
    submeshMaterial: Int32Array;
    materialColors: Float32Array;
    meshVertexOffsets: Int32Array;
    meshInstances: Array<Array<number>>;
    meshTransparent: Array<boolean>;
    rawG3d: AbstractG3d;
    MATRIX_SIZE: number;
    COLOR_SIZE: number;
    POSITION_SIZE: number;
    /**
     * Opaque white
     */
    DEFAULT_COLOR: Float32Array;
    constructor(g3d: AbstractG3d);
    /**
     * Computes the index of the first vertex of each mesh
     */
    private computeMeshVertexOffsets;
    /**
     * Rebase indices to be relative to its own mesh instead of to the whole g3d
     */
    private rebaseIndices;
    /**
     * Computes all instances pointing to each mesh.
     */
    private computeMeshInstances;
    /**
     * Computes an array where true if any of the materials used by a mesh has transparency.
     */
    private computeMeshIsTransparent;
    getVertexCount: () => number;
    getMeshCount: () => number;
    getMeshIndexStart(mesh: number): number;
    getMeshIndexEnd(mesh: number): number;
    getMeshIndexCount(mesh: number): number;
    getMeshVertexStart(mesh: number): number;
    getMeshVertexEnd(mesh: number): number;
    getMeshVertexCount(mesh: number): number;
    getMeshSubmeshStart(mesh: number): number;
    getMeshSubmeshEnd(mesh: number): number;
    getMeshSubmeshCount(mesh: number): number;
    getSubmeshIndexStart(submesh: number): number;
    getSubmeshIndexEnd(submesh: number): number;
    getSubmeshIndexCount(submesh: number): number;
    /**
     * Returns color of given submesh as a 4-number array (RGBA)
     * @param submesh g3d submesh index
     */
    getSubmeshColor(submesh: number): Float32Array;
    getInstanceCount: () => number;
    /**
     * Returns an 16 number array representation of the matrix for given instance
     * @param instance g3d instance index
     */
    getInstanceMatrix(instance: number): Float32Array;
    getMaterialCount: () => number;
    /**
     * Returns color of given material as a 4-number array (RGBA)
     * @param material g3d material index
     */
    getMaterialColor(material: number): Float32Array;
    static createFromBfast(bfast: BFast): G3d;
    validate(): void;
}
export {};
