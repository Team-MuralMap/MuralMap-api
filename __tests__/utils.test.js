const matchers = require("jest-extended");
expect.extend(matchers);
const { convertTimestampToDate, checkIfNum } = require("../db/utils/utils");

describe("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(typeof result).toBe("object");
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});

describe("checkIfNum", () => {
  test("fails when provided a letter", () => {
    expect(checkIfNum("a")).toBe(false);
  });
  test("fails when provided too high of a number", () => {
    expect(checkIfNum(2147483648)).toBe(false);
  });
  test("fails when provided a negative number", () => {
    expect(checkIfNum(-28)).toBe(false);
  });
  test("passes when provided a number within INT limits", () => {
    expect(checkIfNum(4828)).toBe(true);
  });
});
