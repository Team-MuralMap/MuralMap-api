const matchers = require("jest-extended");
expect.extend(matchers);
const {
  convertTimestampToDate,
  checkIfNum,
  coordinatesToNumbers,
} = require("../db/utils/utils");

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

describe("coordinatesToNumbers", () => {
  test("converts latitude and longitude to numbers", () => {
    expect(
      coordinatesToNumbers({ latitude: "50.23", longitude: "-4.87" })
    ).toEqual({ latitude: 50.23, longitude: -4.87 });
  });
  test("ignores other keys and values", () => {
    expect(
      coordinatesToNumbers({
        site_id: 1,
        author_id: 1,
        longitude: "21.163367",
        latitude: "43.961623",
        randomString: "string",
      })
    ).toEqual({
      site_id: 1,
      author_id: 1,
      longitude: 21.163367,
      latitude: 43.961623,
      randomString: "string",
    });
  });
  test("returns input if coordinates are already numbers", () => {
    expect(
      coordinatesToNumbers({
        site_id: 1,
        author_id: 1,
        longitude: 21.163367,
        latitude: 43.961623,
      })
    ).toEqual({
      site_id: 1,
      author_id: 1,
      longitude: 21.163367,
      latitude: 43.961623,
    });
  });
  test("returns initial object if keys are missing", () => {
    expect(
      coordinatesToNumbers({
        string: "hello",
        number: 123,
      })
    ).toEqual({
      string: "hello",
      number: 123,
    });
  });
  test("input and output have different references", () => {
    const input = {
      site_id: 1,
      author_id: 1,
      longitude: "21.163367",
      latitude: "43.961623",
    };
    const output = coordinatesToNumbers(input);
    expect(input).not.toBe(output);
  });
  test("input is not mutated", () => {
    const input = {
      site_id: 1,
      author_id: 1,
      longitude: "21.163367",
      latitude: "43.961623",
    };
    const inputCopy = {
      site_id: 1,
      author_id: 1,
      longitude: "21.163367",
      latitude: "43.961623",
    };
    coordinatesToNumbers(input);
    expect(input).toEqual(inputCopy);
  });
});
