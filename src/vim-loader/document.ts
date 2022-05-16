import { BFast } from './bfast'
import { G3d } from './g3d'

const TypeSizes = { 
  byte: 1,
  short: 2,
  int : 4,
  float : 4,
  long : 8,
  double : 8,
  default: 4,
}

function getTypeSize(typeName: string): number {
  if (typeName in TypeSizes) 
    return TypeSizes[typeName];
  else
    return TypeSizes.default;
}

const ArrayConstructors = {
  byte:  Int8Array,
  short: Int16Array,
  int: Int32Array,
  float: Float32Array,
  long: Float64Array,
  double: Float64Array,
  default: Uint8Array,
}

function getTypeArrayConstructor(typeName: string): any {
  if (typeName in ArrayConstructors)
    return ArrayConstructors[typeName];
  else
    throw ArrayConstructors.default;
}

export class EntityTable 
{ 
  columns: Map<string, EntityColumn>;  
  constructor(bfast: BFast)
  {
    this.columns = new Map<string, EntityColumn>();
    for (let i=0; i < bfast.buffers.length; ++i) {
      const name = bfast.names[i];
      const buffer = bfast.buffers[i];
      this.columns.set(name, new EntityColumn(name, buffer));
    }
  }
}

export class EntityColumn
{
  name: string;
  data: any;
  constructor(name: string, buffer: Uint8Array)
  {
    this.name = name;
    const type = name.split(':')[0];
    const size = getTypeSize(type);    
    const length = buffer.length / 4;
    const ctor = getTypeArrayConstructor(type);
    this.data = ctor(buffer.buffer, buffer.byteOffset, length);
  }  
}

export class Document 
{
  g3d: G3d
  _entity: BFast
  _strings: string[]

  _instanceToElement: number[]
  _elementToInstances: Map<number, number[]>
  _elementIds: number[]
  _elementIdToElements: Map<number, number[]>

  constructor (
    g3d: G3d,
    entities: BFast,
    strings: string[],
    instanceToElement: number[],
    elementToInstances: Map<number, number[]>,
    elementIds: number[],
    elementIdToElements: Map<number, number[]>
  ) 
  {
    this.g3d = g3d
    this._entity = entities
    this._strings = strings
    this._instanceToElement = instanceToElement
    this._elementToInstances = elementToInstances
    this._elementIds = elementIds
    this._elementIdToElements = elementIdToElements
  }

  static createFromBfast (bfast: BFast) 
  {
    const g3d = G3d.createFromBfast(bfast.getChild('geometry'));
    const strings = new TextDecoder('utf-8').decode(bfast.getBuffer('strings')).split('\0');
    const entities = bfast.getChild('entities');

    const nodes = entities.getChild('Vim.Node');
    const instanceToElement = nodes.getBuffer('index:Vim.Element:Element');
    
    const elements = entities.getChild('Vim.Element');
    const elementIds = elements.getBuffer('int:Id') ?? elements.getBuffer('numeric:Id');

    const elementToInstance = Document.invertMap(instanceToElement)
    const elementIdToElements = Document.invertMap(elementIds)

    return new Document(
      g3d,
      entities,
      strings,
      instanceToElement,
      elementToInstance,
      elementIds,
      elementIdToElements
    )
  }

  static invertMap (data: number[]) : Map<number, number[]> {
    const result = new Map<number, number[]>()
    for (let i = 0; i < data.length; i++) {
      const value = data[i];
      if (!result.has(value)) {
        result.set(value, [i]);
      } else {
        result.get(value).push(i);
      }
    }
    return result;
  }

  getInstanceFromElement (elementIndex: number) {
    return this._elementToInstances.get(elementIndex);
  }

  getElementFromInstance (instance: number) {
    return this._instanceToElement[instance];
  }

  getElementFromElementId (elementId: number) {
    return this._elementIdToElements.get(elementId);
  }

  getElementId (element: number) {
    return this._elementIds[element];
  }
}
