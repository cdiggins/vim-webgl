/**
 * @module vim-loader
 */

import { BFast } from './bfast'
import { G3d } from './g3d'

export class Document {
  g3d: G3d
  private _entity: BFast
  private _strings: string[]

  private _instanceToElement: number[]
  private _elementToInstances: Map<number, number[]>
  private _elementIds: number[]
  private _elementIdToElements: Map<number, number[]>

  private constructor (
    g3d: G3d,
    entities: BFast,
    strings: string[],
    instanceToElement: number[],
    elementToInstances: Map<number, number[]>,
    elementIds: number[],
    elementIdToElements: Map<number, number[]>
  ) {
    this.g3d = g3d
    this._entity = entities
    this._strings = strings
    this._instanceToElement = instanceToElement
    this._elementToInstances = elementToInstances
    this._elementIds = elementIds
    this._elementIdToElements = elementIdToElements
  }

  /**
   * Creates document by fetching all required data from bfast.
   */
  static async createFromBfast (bfast: BFast) {
    let g3d: G3d
    let entity: BFast
    let strings: string[]

    let instanceToElement: number[]
    let elementIds: number[]

    await Promise.all([
      Document.requestG3d(bfast).then((g) => (g3d = g)),
      Document.requestStrings(bfast).then((strs) => (strings = strs)),
      Document.requestEntities(bfast)
        .then((ets) => (entity = ets))
        .then((ets) =>
          Promise.all([
            Document.requestInstanceToElement(ets).then(
              (array) => (instanceToElement = array)
            ),
            Document.requestElementIds(ets).then((v) => (elementIds = v))
          ])
        )
    ])

    const elementToInstance = Document.invert(instanceToElement!)
    const elementIdToElements = Document.invert(elementIds!)
    return new Document(
      g3d!,
      entity!,
      strings!,
      instanceToElement!,
      elementToInstance,
      elementIds!,
      elementIdToElements
    )
  }

  private static async requestG3d (bfast: BFast) {
    const geometry = await bfast.getBfast('geometry')
    if (!geometry) {
      throw new Error('Could not get G3d Data from VIM file.')
    }
    const g3d = await G3d.createFromBfast(geometry)
    return g3d
  }

  private static async requestStrings (bfast: BFast) {
    const buffer = await bfast.getBuffer('strings')
    if (!buffer) throw new Error('Could not get String Data from VIM file.')
    const strings = new TextDecoder('utf-8').decode(buffer).split('\0')
    return strings
  }

  private static async requestEntities (bfast: BFast) {
    const entities = await bfast.getBfast('entities')
    if (!entities) throw new Error('Could not get Entities Data from VIM file.')
    return entities
  }

  private static async requestInstanceToElement (entities: BFast) {
    const nodes = await entities.getBfast('Vim.Node')
    const instances = await nodes?.getArray('index:Vim.Element:Element')
    if (!instances) {
      throw new Error('Could not get InstanceToElement from VIM file.')
    }
    return instances
  }

  /**
   * Request element id table from remote with support for legacy name
   */
  private static async requestElementIds (entities: BFast) {
    const elements = await entities.getBfast('Vim.Element')
    const ids =
      (await elements?.getArray('int:Id')) ??
      (await elements?.getArray('numeric:Id'))

    if (!ids) {
      throw new Error('Could not get ElementIds from VIM file.')
    }
    return ids
  }

  /**
   * Returns a map where data[i] -> i
   */
  private static invert (data: number[]) {
    const result = new Map<number, number[]>()
    for (let i = 0; i < data.length; i++) {
      const value = data[i]
      const list = result.get(value)
      if (list) {
        list.push(i)
      } else {
        result.set(value, [i])
      }
    }
    return result
  }

  /**
   * Returns all element indices of the vim
   */
  * getAllElements () {
    for (let i = 0; i < this._elementIds.length; i++) {
      yield i
    }
  }

  /**
   * Returns instance indices associated with vim element index
   * @param element vim element index
   */
  getInstanceFromElement (element: number) {
    return this._elementToInstances.get(element)
  }

  /**
   * Returns all fields of element at given index
   * @param element vim element index
   */
  async getElement (element: number) {
    return this.getEntity('Vim.Element', element)
  }

  /**
   * Returns the element index associated with the g3d instance index.
   * @param instance g3d instance index
   * @returns element index or -1 if not found
   */
  getElementFromInstance (instance: number) {
    return this._instanceToElement[instance]
  }

  /**
   * Returns the element index associated with element Id.
   * @param elementId vim element Id
   * @returns element index or -1 if not found
   */
  getElementFromElementId (elementId: number) {
    return this._elementIdToElements.get(elementId)
  }

  /**
   * Returns element id from element index
   * @param element element index
   */
  getElementId (element: number) {
    return this._elementIds[element]
  }

  /**
   * Returns all fields at given indices from buffer with given name
   * @param name buffer name
   * @param index row index
   */
  async getEntity (name: string, index: number) {
    const elements = await this._entity.getBfast(name)
    const row = await elements?.getRow(index)
    if (!row) return
    this.resolveStrings(row)
    return row
  }

  /**
   * Associate all string indices with their related strings.
   */
  private resolveStrings (map: Map<string, number | undefined>) {
    const result = <Map<string, string | number | undefined>>map
    for (const key of map.keys()) {
      if (key.startsWith('string:')) {
        const v = map.get(key)
        result.set(key, v ? this._strings[v] : undefined)
      }
    }
  }
}
