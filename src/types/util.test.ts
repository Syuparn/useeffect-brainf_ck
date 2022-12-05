import { describe, expect, it } from "vitest";
import { updateArr } from "./util";

describe("update numbers", () => {
  it("[1, 2, 3]", () => {
    const arr = [1, 2, 3];

    expect(updateArr(arr, 1, 5)).toStrictEqual([1, 5, 3]);
  });
});

describe("update strings", () => {
  it(`["a", "b", "c"]`, () => {
    const arr = ["a", "b", "c"];

    expect(updateArr(arr, 0, "A")).toStrictEqual(["A", "b", "c"]);
  });
});
