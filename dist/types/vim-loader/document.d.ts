import { BFast } from './bfast';
import { G3d } from './g3d';
export declare class EntityTable {
    name: string;
    columns: Map<string, EntityColumn>;
    numRows: number;
    constructor(bfast: BFast, name: string);
    getColumn(name: string): EntityColumn;
    getColumnData(name: string): ArrayLike<any>;
    getRowData(n: number): any;
}
export declare class EntityColumn {
    name: string;
    type: string;
    typeSize: number;
    data: ArrayLike<any>;
    constructor(name: string, buffer: Uint8Array);
}
export declare class Document {
    bfast: BFast;
    g3d: G3d;
    entities: BFast;
    tables: Map<string, EntityTable>;
    strings: string[];
    instanceToElement: ArrayLike<number>;
    elementIds: ArrayLike<number>;
    elementToInstances: Map<number, number[]>;
    elementIdToElements: Map<number, number[]>;
    constructor(bfast: BFast);
    getTable(name: string): EntityTable;
    getColumnData(tableName: string, columnName: string): ArrayLike<any>;
    getRowData(tableName: string, row: number): any;
    getInstanceFromElement(elementIndex: number): number[];
    getElementFromInstance(instance: number): number;
    getElementFromElementId(elementId: number): number[];
    getElementId(element: number): number;
    getElementData(element: number): any;
}
