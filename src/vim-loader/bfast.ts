export class BFastHeader {
  magic: number
  dataStart: number
  dataEnd: number
  numArrays: number
  isValid: boolean
  error: string

  constructor (
    magic: number,
    dataStart: number,
    dataEnd: number,
    numArrays: number,
    byteLength: number
  ) {
    this.isValid = false
    if (magic !== 0xbfa5) 
      this.error = 'Not a BFAST file, or endianness is swapped';
    else if (dataStart <= 32 || dataStart > byteLength) 
      this.error = 'Data start is out of valid range';
    else if (dataEnd < dataStart || dataEnd > byteLength) 
      this.error = 'Data end is out of valid range';
    else if (numArrays < 0 || numArrays > dataEnd) 
      this.error = 'Number of arrays is invalid';
    else 
      this.isValid = true;
    this.magic = magic;
    this.dataStart = dataStart;
    this.dataEnd = dataEnd;
    this.numArrays = numArrays;
  }

  static fromBytes (bytes: Uint8Array, byteLength: number): BFastHeader {
    const ints = new Int32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 4)
    return BFastHeader.fromArray(ints, byteLength);
  }

  static fromArray (array: Int32Array, byteLength: number): BFastHeader {
    if (array.length < 8) {
      let r = new this(0,0,0,0,0);
      r.isValid = false;
      r.error = "Insufficient length";
    }
    else {
      return new this(array[0], array[2], array[4], array[6], byteLength)
    }
  }
}

export class BFast {
  header: BFastHeader
  names: string[]
  buffers: Uint8Array[]
  children: Map<string, BFast>

  constructor (header: BFastHeader, names: string[], buffers: Uint8Array[]) {
    this.header = header
    this.names = names
    this.buffers = buffers
    if (names.length != buffers.length) throw new Error("number of names, and number of buffers must match");    
    this.children = new Map<string, BFast>()
  }
    
  getBuffer(name: string): Uint8Array {
    const index = this.names.indexOf(name);
    if (index < 0) throw new Error("buffer " + name + " not found");
    return this.buffers[index];
  }

  getChild(name: string): BFast {
    return this.children.get(name);
  }

  static isBfast(bytes: Uint8Array): boolean {
    const header = BFastHeader.fromBytes(bytes, bytes.length);
    return header.isValid;
  }

  static parseFromArray (bytes: Uint8Array): BFast {
    return this.parseFromBuffer(
      bytes.buffer,
      bytes.byteOffset,
      bytes.byteLength
    )
  }  

  // BFAST is the container format for an array of binary arrays
  static parseFromBuffer (
    arrayBuffer: ArrayBuffer,
    byteOffset: number = 0,
    byteLength: number = arrayBuffer.byteLength - byteOffset
  ): BFast 
  {
    // Cast the input data to 32-bit integers
    // Note that according to the spec they are 64 bit numbers. In JavaScript you can't have 64 bit integers,
    // and it would bust the amount of memory we can work with in most browsers and low-power devices
    const data = new Int32Array(arrayBuffer, byteOffset, byteLength / 4)

    // Parse the header
    const header = BFastHeader.fromArray(data, byteLength)
    if (!header.isValid)
      throw new Error(header.error);

    // Compute each buffer
    const buffers: Uint8Array[] = []
    let pos = 8
    for (let i = 0; i < header.numArrays; ++i) {
      const begin = data[pos + 0]
      const end = data[pos + 2]

      // Check validity of data
      if (data[pos + 1] !== 0) 
        throw new Error('Expected 0 in position ' + (pos + 1) * 4);
      if (data[pos + 3] !== 0) 
        throw new Error('Expected 0 in position ' + (pos + 3) * 4);
      if (begin < header.dataStart || begin > header.dataEnd) 
        throw new Error('Buffer start is out of range');
      if (end < begin || end > header.dataEnd) 
        throw new Error('Buffer end is out of range');

      pos += 4
      const buffer = new Uint8Array(
        arrayBuffer,
        begin + byteOffset,
        end - begin
      )
      buffers.push(buffer)
    }

    if (buffers.length < 0) 
      throw new Error('Expected at least one buffer containing the names')

    // break the first one up into names
    const joinedNames = new TextDecoder('utf-8').decode(buffers[0])

    // Removing the trailing '\0' before spliting the names
    let names = joinedNames.slice(0, -1).split('\0')
    if (joinedNames.length === 0) names = []

    // Validate the number of names
    if (names.length !== buffers.length - 1) {
      throw new Error(
        'Expected number of names to be equal to the number of buffers - 1'
      )
    }

    var slices = buffers.slice(1);
    var result = new BFast(header, names, slices);

    for (var i=0; i < names.length; ++i)
    {
      var buffer = buffers[i];
      if (this.isBfast(buffer))      
      {
        var bfast = BFast.parseFromArray(buffer);
        result.children.set(names[i], bfast);
      }
    }

    return result; 
  }
}