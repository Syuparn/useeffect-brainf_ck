export class Brain {
  input: Uint8Array;
  output: Uint8Array;
  memory: Uint8Array;
  source: string;
  cursor: number;

  static readonly MEMORY_SIZE = 1024;

  public static create(source: string, input: Uint8Array) {
    return new Brain({
      input: input,
      output: new Uint8Array(),
      memory: new Uint8Array(Brain.MEMORY_SIZE),
      source: source,
      cursor: 0,
    });
  }

  private constructor({ input, output, memory, source, cursor }: Props) {
    this.input = input;
    this.output = output;
    this.memory = memory;
    this.source = source;
    this.cursor = cursor;
  }

  public next(): Brain {
    if (this.cursor >= this.source.length) {
      return this;
    }

    return this;
  }
}

type Props = {
  input: Uint8Array;
  output: Uint8Array;
  memory: Uint8Array;
  source: string;
  cursor: number;
};
