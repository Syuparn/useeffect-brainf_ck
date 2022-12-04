import { describe, expect, it } from "vitest";
import { Brain } from "./brain";

describe("add", () => {
  it("1 + 2 = 3", () => {
    const result = 1 + 2;

    expect(result).toBe(3);
  });
});

describe("next with empty source", () => {
  const brain = Brain.create("", new Uint8Array());

  it("nothing happens", () => {
    const next = brain.next();

    expect(next).toStrictEqual(Brain.create("", new Uint8Array()));
  });
});
