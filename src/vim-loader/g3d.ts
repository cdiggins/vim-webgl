/**
 * @module vim-loader
 */

import { BFast } from './bfast'

class G3dAttributeDescriptor {
  // original descriptor string
  description: string
  // Indicates the part of the geometry that this attribute is associated with
  association: string
  // the role of the attribute
  semantic: string
  // each attribute type should have it's own index ( you can have uv0, uv1, etc. )
  attributeTypeIndex: string
  // the type of individual values (e.g. int32, float64)
  dataType: string
  // how many values associated with each element (e.g. UVs might be 2, geometry might be 3, quaternions 4, matrices 9 or 16)
  dataArity: number

  constructor (
    description: string,
    association: string,
    semantic: string,
    attributeTypeIndex: string,
    dataType: string,
    dataArity: string
  ) {
    if (!description.startsWith('g3d:')) {
      throw new Error(`${description} must start with 'g3d'`)
    }

    this.description = description
    this.association = association
    this.semantic = semantic
    this.attributeTypeIndex = attributeTypeIndex
    this.dataType = dataType
    this.dataArity = parseInt(dataArity)
  }

  static fromString (descriptor: string): G3dAttributeDescriptor {
    const desc = descriptor.split(':')

    if (desc.length !== 6) {
      throw new Error(`${descriptor}, must have 6 components delimited by ':'`)
    }

    return new this(descriptor, desc[1], desc[2], desc[3], desc[4], desc[5])
  }

  matches (other: G3dAttributeDescriptor) {
    const match = (a: string, b: string) => a === '*' || b === '*' || a === b

    return (
      match(this.association, other.association) &&
      match(this.semantic, other.semantic) &&
      match(this.attributeTypeIndex, other.attributeTypeIndex) &&
      match(this.dataType, other.dataType)
    )
  }
}

type TypedArray =
  | Uint8Array
  | Int16Array
  | Uint16Array
  | Int32Array
  | Float32Array
  | Float64Array

class G3dAttribute {
  descriptor: G3dAttributeDescriptor
  bytes: Uint8Array
  data: TypedArray

  constructor (descriptor: G3dAttributeDescriptor, bytes: Uint8Array) {
    this.descriptor = descriptor
    this.bytes = bytes
    this.data = G3dAttribute.castData(bytes, descriptor.dataType)
  }

  static fromString (descriptor: string, buffer: Uint8Array): G3dAttribute {
    return new this(G3dAttributeDescriptor.fromString(descriptor), buffer)
  }

  // Converts a VIM attribute into a typed array from its raw data
  static castData (bytes: Uint8Array, dataType: string): TypedArray {
    switch (dataType) {
      case 'float32':
        return new Float32Array(
          bytes.buffer,
          bytes.byteOffset,
          bytes.byteLength / 4
        )
      case 'float64':
        throw new Float64Array(
          bytes.buffer,
          bytes.byteOffset,
          bytes.byteLength / 8
        )
      case 'int8':
        return bytes
      case 'int16':
        return new Int16Array(
          bytes.buffer,
          bytes.byteOffset,
          bytes.byteLength / 2
        )
      case 'uint16':
        return new Uint16Array(
          bytes.buffer,
          bytes.byteOffset,
          bytes.byteLength / 2
        )
      case 'int32':
        return new Int32Array(
          bytes.buffer,
          bytes.byteOffset,
          bytes.byteLength / 4
        )
      // case "int64": return new Int64Array(data.buffer, data.byteOffset, data.byteLength / 8);
      default:
        throw new Error('Unrecognized attribute data type ' + dataType)
    }
  }
}

/**
 * G3D is a simple, efficient, generic binary format for storing and transmitting geometry.
 * The G3D format is designed to be used either as a serialization format or as an in-memory data structure.
 * See https://github.com/vimaec/g3d
 */
class AbstractG3d {
  meta: string
  attributes: G3dAttribute[]

  constructor (meta: string, attributes: G3dAttribute[]) {
    this.meta = meta
    this.attributes = attributes
  }

  findAttribute (descriptor: string): G3dAttribute | undefined {
    const filter = G3dAttributeDescriptor.fromString(descriptor)
    for (let i = 0; i < this.attributes.length; ++i) {
      const attribute = this.attributes[i]
      if (attribute.descriptor.matches(filter)) return attribute
    }
  }

  /**
   * Create g3d from bfast by requesting all necessary buffers individually.
   */
  static createFromBfast (bfast: BFast) {
    const promises = VimAttributes.all.map((a) =>
      bfast
        .getBytes(a)
        .then((bytes) =>
          bytes
            ? new G3dAttribute(G3dAttributeDescriptor.fromString(a), bytes)
            : undefined
        )
    )
    return Promise.all(promises).then(
      (attributes) =>
        new AbstractG3d(
          'meta',
          attributes.filter((a): a is G3dAttribute => a !== undefined)
        )
    )
  }
}
/**
 * See https://github.com/vimaec/vim#vim-geometry-attributes
 */
class VimAttributes {
  static positions = 'g3d:vertex:position:0:float32:3'
  static indices = 'g3d:corner:index:0:int32:1'
  static instanceMeshes = 'g3d:instance:mesh:0:int32:1'
  static instanceTransforms = 'g3d:instance:transform:0:float32:16'
  static instanceFlags = 'g3d:instance:flags:0:uint16:1'
  static meshSubmeshes = 'g3d:mesh:submeshoffset:0:int32:1'
  static submeshIndexOffsets = 'g3d:submesh:indexoffset:0:int32:1'
  static submeshMaterials = 'g3d:submesh:material:0:int32:1'
  static materialColors = 'g3d:material:color:0:float32:4'

  static all = [
    VimAttributes.positions,
    VimAttributes.indices,
    VimAttributes.instanceMeshes,
    VimAttributes.instanceTransforms,
    VimAttributes.instanceFlags,
    VimAttributes.meshSubmeshes,
    VimAttributes.submeshIndexOffsets,
    VimAttributes.submeshMaterials,
    VimAttributes.materialColors
  ]
}

/**
 * G3D is a simple, efficient, generic binary format for storing and transmitting geometry.
 * The G3D format is designed to be used either as a serialization format or as an in-memory data structure.
 * A G3d with specific attributes according to the VIM format specification.
 * See https://github.com/vimaec/vim#vim-geometry-attributes for the vim specification.
 * See https://github.com/vimaec/g3d for the g3d specification.
 */
export class G3d {
  positions: Float32Array
  indices: Uint32Array

  instanceMeshes: Int32Array
  instanceTransforms: Float32Array
  instanceFlags: Uint16Array
  meshSubmeshes: Int32Array
  submeshIndexOffset: Int32Array
  submeshMaterial: Int32Array
  materialColors: Float32Array

  // computed fields
  meshVertexOffsets: Int32Array
  meshInstances: Array<Array<number>>
  meshTransparent: Array<boolean>

  rawG3d: AbstractG3d

  MATRIX_SIZE = 16
  COLOR_SIZE = 4
  POSITION_SIZE = 3
  /**
   * Opaque white
   */
  DEFAULT_COLOR = new Float32Array([1, 1, 1, 1])

  constructor (g3d: AbstractG3d) {
    this.rawG3d = g3d

    this.positions = g3d.findAttribute(VimAttributes.positions)
      ?.data as Float32Array

    const tmp = g3d.findAttribute(VimAttributes.indices)?.data
    if (!tmp) throw new Error('No Index Buffer Found')
    this.indices = new Uint32Array(tmp.buffer, tmp.byteOffset, tmp.length)

    this.meshSubmeshes = g3d.findAttribute(VimAttributes.meshSubmeshes)
      ?.data as Int32Array

    this.submeshIndexOffset = g3d.findAttribute(
      VimAttributes.submeshIndexOffsets
    )?.data as Int32Array

    this.submeshMaterial = g3d.findAttribute(VimAttributes.submeshMaterials)
      ?.data as Int32Array

    this.materialColors = g3d.findAttribute(VimAttributes.materialColors)
      ?.data as Float32Array

    this.instanceMeshes = g3d.findAttribute(VimAttributes.instanceMeshes)
      ?.data as Int32Array

    this.instanceTransforms = g3d.findAttribute(
      VimAttributes.instanceTransforms
    )?.data as Float32Array

    this.instanceFlags =
      (g3d.findAttribute(VimAttributes.instanceFlags)?.data as Uint16Array) ??
      new Uint16Array(this.instanceMeshes.length)

    this.meshVertexOffsets = this.computeMeshVertexOffsets()
    this.rebaseIndices()
    this.meshInstances = this.computeMeshInstances()
    this.meshTransparent = this.computeMeshIsTransparent()
  }

  /**
   * Computes the index of the first vertex of each mesh
   */
  private computeMeshVertexOffsets (): Int32Array {
    const result = new Int32Array(this.getMeshCount())
    for (let m = 0; m < result.length; m++) {
      let min = Number.MAX_SAFE_INTEGER
      const start = this.getMeshIndexStart(m)
      const end = this.getMeshIndexEnd(m)
      for (let i = start; i < end; i++) {
        min = Math.min(min, this.indices[i])
      }
      result[m] = min
    }
    return result
  }

  /**
   * Rebase indices to be relative to its own mesh instead of to the whole g3d
   */
  private rebaseIndices () {
    const count = this.getMeshCount()
    for (let m = 0; m < count; m++) {
      const offset = this.meshVertexOffsets[m]
      const start = this.getMeshIndexStart(m)
      const end = this.getMeshIndexEnd(m)
      for (let i = start; i < end; i++) {
        this.indices[i] -= offset
      }
    }
  }

  /**
   * Computes all instances pointing to each mesh.
   */
  private computeMeshInstances = (): number[][] => {
    const result: number[][] = []

    for (let i = 0; i < this.instanceMeshes.length; i++) {
      const mesh = this.instanceMeshes[i]
      if (mesh < 0) continue
      const instanceIndices = result[mesh]
      if (instanceIndices) instanceIndices.push(i)
      else result[mesh] = [i]
    }

    return result
  }

  /**
   * Computes an array where true if any of the materials used by a mesh has transparency.
   */
  private computeMeshIsTransparent (): Array<boolean> {
    const result = new Array<boolean>(this.getMeshCount())
    for (let m = 0; m < result.length; m++) {
      const subStart = this.getMeshSubmeshStart(m)
      const subEnd = this.getMeshSubmeshEnd(m)
      for (let s = subStart; s < subEnd; s++) {
        const material = this.submeshMaterial[s]
        const alpha =
          this.materialColors[material * this.COLOR_SIZE + this.COLOR_SIZE - 1]
        result[m] = result[m] || alpha < 1
      }
    }
    return result
  }

  // ------------- All -----------------
  getVertexCount = () => this.positions.length / this.POSITION_SIZE

  // ------------- Meshes -----------------
  getMeshCount = () => this.meshSubmeshes.length

  getMeshIndexStart (mesh: number): number {
    const subStart = this.getMeshSubmeshStart(mesh)
    return this.getSubmeshIndexStart(subStart)
  }

  getMeshIndexEnd (mesh: number): number {
    const subEnd = this.getMeshSubmeshEnd(mesh)
    return this.getSubmeshIndexEnd(subEnd - 1)
  }

  getMeshIndexCount (mesh: number): number {
    return this.getMeshIndexEnd(mesh) - this.getMeshIndexStart(mesh)
  }

  getMeshVertexStart (mesh: number): number {
    return this.meshVertexOffsets[mesh]
  }

  getMeshVertexEnd (mesh: number): number {
    return mesh < this.meshVertexOffsets.length - 1
      ? this.meshVertexOffsets[mesh + 1]
      : this.getVertexCount()
  }

  getMeshVertexCount (mesh: number): number {
    return this.getMeshVertexEnd(mesh) - this.getMeshVertexStart(mesh)
  }

  getMeshSubmeshStart (mesh: number): number {
    return this.meshSubmeshes[mesh]
  }

  getMeshSubmeshEnd (mesh: number): number {
    return mesh < this.meshSubmeshes.length - 1
      ? this.meshSubmeshes[mesh + 1]
      : this.submeshIndexOffset.length
  }

  getMeshSubmeshCount (mesh: number): number {
    return this.getMeshSubmeshEnd(mesh) - this.getMeshSubmeshStart(mesh)
  }

  // ------------- Submeshes -----------------

  getSubmeshIndexStart (submesh: number): number {
    return this.submeshIndexOffset[submesh]
  }

  getSubmeshIndexEnd (submesh: number): number {
    return submesh < this.submeshIndexOffset.length - 1
      ? this.submeshIndexOffset[submesh + 1]
      : this.indices.length
  }

  getSubmeshIndexCount (submesh: number): number {
    return this.getSubmeshIndexEnd(submesh) - this.getSubmeshIndexStart(submesh)
  }

  /**
   * Returns color of given submesh as a 4-number array (RGBA)
   * @param submesh g3d submesh index
   */
  getSubmeshColor (submesh: number): Float32Array {
    return this.getMaterialColor(this.submeshMaterial[submesh])
  }

  // ------------- Instances -----------------
  getInstanceCount = () => this.instanceMeshes.length

  /**
   * Returns an 16 number array representation of the matrix for given instance
   * @param instance g3d instance index
   */
  getInstanceMatrix (instance: number): Float32Array {
    return this.instanceTransforms.subarray(
      instance * this.MATRIX_SIZE,
      (instance + 1) * this.MATRIX_SIZE
    )
  }

  // ------------- Material -----------------

  getMaterialCount = () => this.materialColors.length / this.COLOR_SIZE

  /**
   * Returns color of given material as a 4-number array (RGBA)
   * @param material g3d material index
   */
  getMaterialColor (material: number): Float32Array {
    if (material < 0) return this.DEFAULT_COLOR
    return this.materialColors.subarray(
      material * this.COLOR_SIZE,
      (material + 1) * this.COLOR_SIZE
    )
  }

  static async createFromBfast (bfast: BFast) {
    return AbstractG3d.createFromBfast(bfast).then((g3d) => new G3d(g3d))
  }

  validate () {
    const isPresent = (attribute: any, label: string) => {
      if (!attribute) {
        throw new Error(`Missing Attribute Buffer: ${label}`)
      }
    }
    isPresent(this.positions, 'position')
    isPresent(this.indices, 'indices')
    isPresent(this.instanceMeshes, 'instanceMeshes')
    isPresent(this.instanceTransforms, 'instanceTransforms')
    isPresent(this.meshSubmeshes, 'meshSubmeshes')
    isPresent(this.submeshIndexOffset, 'submeshIndexOffset')
    isPresent(this.submeshMaterial, 'submeshMaterial')
    isPresent(this.materialColors, 'materialColors')

    // Basic
    if (this.positions.length % this.POSITION_SIZE !== 0) {
      throw new Error(
        'Invalid position buffer, must be divisible by ' + this.POSITION_SIZE
      )
    }

    if (this.indices.length % 3 !== 0) {
      throw new Error('Invalid Index Count, must be divisible by 3')
    }

    for (let i = 0; i < this.indices.length; i++) {
      if (this.indices[i] < 0 || this.indices[i] >= this.positions.length) {
        throw new Error('Vertex index out of bound')
      }
    }

    // Instances
    if (
      this.instanceMeshes.length !==
      this.instanceTransforms.length / this.MATRIX_SIZE
    ) {
      throw new Error('Instance buffers mismatched')
    }

    if (this.instanceTransforms.length % this.MATRIX_SIZE !== 0) {
      throw new Error(
        'Invalid InstanceTransform buffer, must respect arity ' +
          this.MATRIX_SIZE
      )
    }

    for (let i = 0; i < this.instanceMeshes.length; i++) {
      if (this.instanceMeshes[i] >= this.meshSubmeshes.length) {
        throw new Error('Instance Mesh Out of range.')
      }
    }

    // Meshes
    for (let i = 0; i < this.meshSubmeshes.length; i++) {
      if (
        this.meshSubmeshes[i] < 0 ||
        this.meshSubmeshes[i] >= this.submeshIndexOffset.length
      ) {
        throw new Error('MeshSubmeshOffset out of bound at')
      }
    }

    for (let i = 0; i < this.meshSubmeshes.length - 1; i++) {
      if (this.meshSubmeshes[i] >= this.meshSubmeshes[i + 1]) {
        throw new Error('MeshSubmesh out of sequence.')
      }
    }

    // Submeshes
    if (this.submeshIndexOffset.length !== this.submeshMaterial.length) {
      throw new Error('Mismatched submesh buffers')
    }

    for (let i = 0; i < this.submeshIndexOffset.length; i++) {
      if (
        this.submeshIndexOffset[i] < 0 ||
        this.submeshIndexOffset[i] >= this.indices.length
      ) {
        throw new Error('SubmeshIndexOffset out of bound')
      }
    }

    for (let i = 0; i < this.submeshIndexOffset.length; i++) {
      if (this.submeshIndexOffset[i] % 3 !== 0) {
        throw new Error('Invalid SubmeshIndexOffset, must be divisible by 3')
      }
    }

    for (let i = 0; i < this.submeshIndexOffset.length - 1; i++) {
      if (this.submeshIndexOffset[i] >= this.submeshIndexOffset[i + 1]) {
        throw new Error('SubmeshIndexOffset out of sequence.')
      }
    }

    for (let i = 0; i < this.submeshMaterial.length; i++) {
      if (this.submeshMaterial[i] >= this.materialColors.length) {
        throw new Error('submeshMaterial out of bound')
      }
    }

    // Materials
    if (this.materialColors.length % this.COLOR_SIZE !== 0) {
      throw new Error(
        'Invalid material color buffer, must be divisible by ' + this.COLOR_SIZE
      )
    }
  }
}
