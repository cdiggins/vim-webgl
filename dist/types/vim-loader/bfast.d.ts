export declare class BFastHeader {
    magic: number;
    dataStart: number;
    dataEnd: number;
    numArrays: number;
    isValid: boolean;
    error: string;
    constructor(magic: number, dataStart: number, dataEnd: number, numArrays: number, byteLength: number);
    static fromBytes(bytes: Uint8Array, byteLength: number): BFastHeader;
    static fromArray(array: Int32Array, byteLength: number): BFastHeader;
}
export declare class BFast {
    header: BFastHeader;
    names: string[];
    buffers: Uint8Array[];
    children: Map<string, BFast>;
    constructor(header: BFastHeader, names: string[], buffers: Uint8Array[]);
    getBuffer(name: string): Uint8Array;
    getChild(name: string): BFast;
    static isBfast(bytes: Uint8Array): boolean;
    static parseFromArray(bytes: Uint8Array): BFast;
    static parseFromBuffer(arrayBuffer: ArrayBuffer, byteOffset?: number, byteLength?: number): BFast;
}
