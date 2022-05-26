import { BFast } from './bfast'
import { G3d } from './g3d'

const TypeSizes = { 
  byte: 1,
  short: 2,
  int : 4,
  float : 4,
  long : 8,
  double : 8,
  string : 4,
  index : 4,
  numeric : 8,
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
  string: Int32Array,
  index: Int32Array,
  numeric: Float64Array,
  default: Uint8Array,
}

function getTypeArrayConstructor(typeName: string): any {
  if (typeName in ArrayConstructors)
    return ArrayConstructors[typeName];
  else
    return ArrayConstructors.default;
}

function invertMap (data: ArrayLike<number>) : Map<number, number[]> {
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

export class EntityTable 
{ 
  name: string;
  columns: Map<string, EntityColumn>;  
  numRows: number;
  constructor(bfast: BFast, name: string)
  {
    this.name = name;
    this.columns = new Map<string, EntityColumn>();
    this.numRows = -1;
    for (let i=0; i < bfast.buffers.length; ++i) {
      const name = bfast.names[i];
      const buffer = bfast.buffers[i];
      const column = new EntityColumn(name, buffer);
      if (this.numRows < 0) 
        this.numRows = column.data.length; 
      if (this.numRows != column.data.length)
        throw new Error("Inconsistent number of rows");
      this.columns.set(column.name, column);
    }
  }
  getColumn(name: string) : EntityColumn {
    return this.columns.get(name);
  }
  getColumnData(name: string) : ArrayLike<any> {
    return this.getColumn(name).data;
  }
  getRowData(n: number): any {
    let r = {};
    for (let [name, col] of this.columns) {
      r[name] = col.data[n];
    }
    return r;  
  }
}

export class EntityColumn
{
  name: string;
  type: string;
  typeSize: number;
  data: ArrayLike<any>;
  constructor(name: string, buffer: Uint8Array)
  {
    const split = name.indexOf(':');     
    this.type = name.slice(0, split);    
    this.name = name.slice(split + 1);
    this.typeSize = getTypeSize(this.type);    
    const length = buffer.length / this.typeSize;
    const ctor = getTypeArrayConstructor(this.type);
    this.data = new ctor(buffer.buffer, buffer.byteOffset, length);
  }  
}

export class Document 
{
  bfast: BFast;
  g3d: G3d;
  entities: BFast;
  tables: Map<string, EntityTable>;
  strings: string[];
  instanceToElement: ArrayLike<number>;
  elementIds: ArrayLike<number>;
  elementToInstances: Map<number, number[]>;
  elementIdToElements: Map<number, number[]>;

  constructor (bfast: BFast) 
  {
    this.g3d = G3d.createFromBfast(bfast.getChild('geometry'));
    this.strings = new TextDecoder('utf-8').decode(bfast.getBuffer('strings')).split('\0');
    this.entities = bfast.getChild('entities');
    this.tables = new Map<string, EntityTable>();
    for (const [k, child] of this.entities.children.entries()) {
      const table = new EntityTable(child, k);
      this.tables.set(table.name, table);
    }

    this.instanceToElement = this.getColumnData('Vim.Node', 'Vim.Element:Element');    
    this.elementIds = this.getColumnData('Vim.Element', 'Id');
    this.elementToInstances = invertMap(this.instanceToElement)
    this.elementIdToElements = invertMap(this.elementIds)
  }

  getTable(name : string): EntityTable {
    return this.tables.get(name);
  }

  getColumnData(tableName: string, columnName: string) {
    return this.getTable(tableName).getColumnData(columnName);
  }

  getRowData(tableName: string, row: number) {
    return this.getTable(tableName).getRowData(row);
  }

  getInstanceFromElement (elementIndex: number) {
    return this.elementToInstances.get(elementIndex);
  }

  getElementFromInstance (instance: number) {
    return this.instanceToElement[instance];
  }

  getElementFromElementId (elementId: number) {
    return this.elementIdToElements.get(elementId);
  }

  getElementId (element: number) {
    return this.elementIds[element];
  }

  getElementData(element: number) {
    return this.getRowData('Vim.Element', element);
  }
}
