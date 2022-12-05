import { describe, expect, it } from "vitest";
import { Brain } from "./brain";

describe("next with empty source", () => {
  const brain = Brain.create("", new Uint8Array());

  it("nothing happens", () => {
    const next = brain.next();

    expect(next).toStrictEqual(Brain.create("", new Uint8Array()));
  });
});

describe("next with +", () => {
  const brain = Brain.create("+", new Uint8Array());

  it("eval +", () => {
    const next = brain.next();

    expect(next.inputCursor).toStrictEqual(0);
    expect(next.memory[0]).toStrictEqual(1);
    expect(next.memoryCursor).toStrictEqual(0);
    expect(next.sourceCursor).toStrictEqual(1);
    expect(next.output.length).toStrictEqual(0);
  });
});

describe("next with -", () => {
  const brain = Brain.create("-", new Uint8Array());

  it("eval -", () => {
    const next = brain.next();

    expect(next.inputCursor).toStrictEqual(0);
    expect(next.memory[0]).toStrictEqual(255);
    expect(next.memoryCursor).toStrictEqual(0);
    expect(next.sourceCursor).toStrictEqual(1);
    expect(next.output.length).toStrictEqual(0);
  });
});

describe("next with >", () => {
  const brain = Brain.create(">", new Uint8Array());

  it("eval >", () => {
    const next = brain.next();

    expect(next.inputCursor).toStrictEqual(0);
    expect(next.memory[0]).toStrictEqual(0);
    expect(next.memoryCursor).toStrictEqual(1);
    expect(next.sourceCursor).toStrictEqual(1);
    expect(next.output.length).toStrictEqual(0);
  });
});

describe("next with <", () => {
  const brain = Brain.create("<", new Uint8Array());

  it("eval <", () => {
    const next = brain.next();

    expect(next.inputCursor).toStrictEqual(0);
    expect(next.memory[0]).toStrictEqual(0);
    expect(next.memoryCursor).toStrictEqual(1023);
    expect(next.sourceCursor).toStrictEqual(1);
    expect(next.output.length).toStrictEqual(0);
  });
});

describe("next with ,", () => {
  const brain = Brain.create(",", new TextEncoder().encode("a"));

  it("eval ,", () => {
    const next = brain.next();

    expect(next.inputCursor).toStrictEqual(1);
    expect(next.memory[0]).toStrictEqual(97);
    expect(next.memoryCursor).toStrictEqual(0);
    expect(next.sourceCursor).toStrictEqual(1);
    expect(next.output.length).toStrictEqual(0);
  });
});

describe("next with .", () => {
  const brain = Brain.create(".", new Uint8Array());

  it("eval .", () => {
    const next = brain.next();

    expect(next.inputCursor).toStrictEqual(0);
    expect(next.memory[0]).toStrictEqual(0);
    expect(next.memoryCursor).toStrictEqual(0);
    expect(next.sourceCursor).toStrictEqual(1);
    expect(next.output.length).toStrictEqual(1);
    expect(next.output[0]).toStrictEqual(0);
  });
});
