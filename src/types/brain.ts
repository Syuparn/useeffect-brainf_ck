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
      case "[":
        return this.loop();
      case "]":
        return this.break();
    }

    return this.comment();
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
      Uint8Array.of(...this.output, this.pointer()),
      this.memory,
      this.memoryCursor,
      this.source,
      this.sourceCursor + 1
    );
  }

  private loop(): Brain {
    const sourceCursor =
      this.pointer() == 0
        ? matchedBreakPosition(this.source, this.sourceCursor)
        : this.sourceCursor + 1;

    return new Brain(
      this.input,
      this.inputCursor,
      this.output,
      this.memory,
      this.memoryCursor,
      this.source,
      sourceCursor
    );
  }

  private break(): Brain {
    const sourceCursor =
      this.pointer() != 0
        ? matchedLoopPosition(this.source, this.sourceCursor)
        : this.sourceCursor + 1;

    return new Brain(
      this.input,
      this.inputCursor,
      this.output,
      this.memory,
      this.memoryCursor,
      this.source,
      sourceCursor
    );
  }

  private comment(): Brain {
    return new Brain(
      this.input,
      this.inputCursor,
      this.output,
      this.memory,
      this.memoryCursor,
      this.source,
      this.sourceCursor + 1
    );
  }

  private pointer(): number {
    return this.memory[this.memoryCursor];
  }
}

const updateUint8Array = (
  arr: Uint8Array,
  at: number,
  f: (_: number) => number
): Uint8Array => {
  return new Uint8Array(updateArr(Array.from(arr), at, f(arr[at]) % 256));
};

const matchedBreakPosition = (src: string, cursor: number): number => {
  // NOTE: skip first [ itself
  return _matchedBreakPosition(src, cursor + 1, 1);
};

const _matchedBreakPosition = (
  src: string,
  cursor: number,
  nest: number
): number => {
  if (cursor >= src.length || nest == 0) {
    return cursor;
  }

  switch (src[cursor]) {
    case "[":
      return _matchedBreakPosition(src, cursor + 1, nest + 1);
    case "]":
      return _matchedBreakPosition(src, cursor + 1, nest - 1);
    default:
      return _matchedBreakPosition(src, cursor + 1, nest);
  }
};

const matchedLoopPosition = (src: string, cursor: number): number => {
  // NOTE: skip first ] itself
  return _matchedLoopPosition(src, cursor - 1, 1);
};

const _matchedLoopPosition = (
  src: string,
  cursor: number,
  nest: number
): number => {
  if (cursor < 0) {
    return 0;
  }
  if (nest == 0) {
    // NOTE: if the pair, which is located in cursor+1, is found, sourceCursor should be just after it
    return cursor + 2;
  }

  switch (src[cursor]) {
    case "[":
      return _matchedLoopPosition(src, cursor - 1, nest - 1);
    case "]":
      return _matchedLoopPosition(src, cursor - 1, nest + 1);
    default:
      return _matchedLoopPosition(src, cursor - 1, nest);
  }
};
