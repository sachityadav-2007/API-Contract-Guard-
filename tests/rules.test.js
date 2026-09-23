const { runValidation } = require("../src/validator/validator");

test("fails when number is below min", () => {
  const schema = { age: { type: "number", min: 18 } };
  const result = runValidation(schema, { age: 15 });

  expect(result.valid).toBe(false);
  expect(result.errors.age).toBe("Value must be at least 18");
});

test("passes when number meets min", () => {
  const schema = { age: { type: "number", min: 18 } };
  const result = runValidation(schema, { age: 20 });

  expect(result.valid).toBe(true);
});

test("fails when number is above max", () => {
  const schema = { age: { type: "number", max: 100 } };
  const result = runValidation(schema, { age: 150 });

  expect(result.valid).toBe(false);
  expect(result.errors.age).toBe("Value must be at most 100");
});

test("fails when string is shorter than minLength", () => {
  const schema = { password: { type: "string", minLength: 8 } };
  const result = runValidation(schema, { password: "123" });

  expect(result.valid).toBe(false);
  expect(result.errors.password).toBe("Minimum 8 characters required");
});

test("fails when string is longer than maxLength", () => {
  const schema = { username: { type: "string", maxLength: 5 } };
  const result = runValidation(schema, { username: "toolongname" });

  expect(result.valid).toBe(false);
  expect(result.errors.username).toBe("Maximum 5 characters allowed");
});

test("passes when string length is within range", () => {
  const schema = { username: { type: "string", minLength: 2, maxLength: 10 } };
  const result = runValidation(schema, { username: "sachit" });

  expect(result.valid).toBe(true);
});