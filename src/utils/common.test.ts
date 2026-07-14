import { describe, it, expect } from "vitest";
import { capitalize, removeHyphens, cloneDeep } from "./common";

describe("capitalize", () => {
  it("title-cases underscore-separated words", () => {
    expect(capitalize("hello_world")).toBe("Hello World");
  });
  it("normalizes all-caps", () => {
    expect(capitalize("HELLO")).toBe("Hello");
  });
  it("returns empty input unchanged", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("removeHyphens", () => {
  it("camelCases hyphenated text", () => {
    expect(removeHyphens("foo-bar")).toBe("fooBar");
    expect(removeHyphens("a-b-c")).toBe("aBC");
  });
});

describe("cloneDeep", () => {
  it("produces an independent deep copy", () => {
    const src = { a: 1, nested: { b: [1, 2] } };
    const copy = cloneDeep(src);
    copy.nested.b.push(3);
    expect(src.nested.b).toEqual([1, 2]);
    expect(copy.nested.b).toEqual([1, 2, 3]);
  });
});
