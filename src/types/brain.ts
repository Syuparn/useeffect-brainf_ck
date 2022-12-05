import { updateArr } from "./util";

export class Brain {
  static readonly MEMORY_SIZE = 1024;

  public static create(source: string, input: Uint8Array) {
    return new Brain(
      input,
      0,
      new Uint8Array(),
      new Uint8Array(Brain.MEMORY_SIZE),
      0,
      source,
      0
    );
  }

  private constructor(
    public readonly input: Uint8Array,
    public readonly inputCursor: number,
    public readonly output: Uint8Array,
    public readonly memory: Uint8Array,
    public readonly memoryCursor: number,
    public readonly source: string,
    public readonly sourceCursor: number
  ) {}

  public next(): Brain {
    if (this.sourceCursor >= this.source.length) {
      return this;
    }

    switch (this.source[this.sourceCursor]) {
      case "+":
        return this.add();
      case "-":
        return this.sub();
      case ">":
        return this.inc();
      case "<":
        return this.dec();
      case ",":
        return this.read();
      case ".":
        return this.write();
    }

    return this;
  }

  private add(): Brain {
    return new Brain(
      this.input,
      this.inputCursor,
      this.output,
      updateUint8Array(this.memory, this.memoryCursor, (e) => e + 1),
      this.memoryCursor,
      this.source,
      this.sourceCursor + 1
    );
  }

  private sub(): Brain {
    return new Brain(
      this.input,
      this.inputCursor,
      this.output,
      updateUint8Array(this.memory, this.memoryCursor, (e) => e - 1),
      this.memoryCursor,
      this.source,
      this.sourceCursor + 1
    );
  }

  private inc(): Brain {
    return new Brain(
      this.input,
      this.inputCursor,
      this.output,
      this.memory,
      (this.memoryCursor + 1) % Brain.MEMORY_SIZE,
      this.source,
      this.sourceCursor + 1
    );
  }

  private dec(): Brain {
    return new Brain(
      this.input,
      this.inputCursor,
      this.output,
      this.memory,
      (this.memoryCursor + Brain.MEMORY_SIZE - 1) % Brain.MEMORY_SIZE,
      this.source,
      this.sourceCursor + 1
    );
  }

  private read(): Brain {
    const got =
      this.inputCursor < this.input.length ? this.input[this.inputCursor] : 0;
    return new Brain(
      this.input,
      this.inputCursor + 1,
      this.output,
      updateUint8Array(this.memory, this.memoryCursor, (_) => got),
      this.memoryCursor,
      this.source,
      this.sourceCursor + 1
    );
  }

  private write(): Brain {
    return new Brain(
      this.input,
      this.inputCursor,
      Uint8Array.of(...this.output, this.memory[this.memoryCursor]),
      this.memory,
      this.memoryCursor,
      this.source,
      this.sourceCursor + 1
    );
  }
}

const updateUint8Array = (
  arr: Uint8Array,
  at: number,
  f: (_: number) => number
): Uint8Array => {
  return new Uint8Array(updateArr(Array.from(arr), at, f(arr[at]) % 256));
};
