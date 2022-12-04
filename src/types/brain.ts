export class Brain {
  input: Uint8Array;
  output: Uint8Array;
  memory: Uint8Array;
  source: string;
  cursur: number;

  static readonly MEMORY_SIZE = 1024;

  constructor(source: string, input: Uint8Array) {
    this.input = input;
    this.output = new Uint8Array();
    this.memory = new Uint8Array(Brain.MEMORY_SIZE);
    this.source = source;
    this.cursur = 0;
  }

  public next() {
    if (this.cursur >= this.source.length) {
      return;
    }
  }
}
