const { runValidation } = require("../src/validator/validator");

test("fails when type is wrong (expected string, got number)", () => {
  const schema = { name: { type: "string" } };
  const result = runValidation(schema, { name: 123 });

  expect(result.valid).toBe(false);
  expect(result.errors.name).toBe("Must be a string");
});

test("passes when type is correct", () => {
  const schema = { age: { type: "number" } };
  const result = runValidation(schema, { age: 20 });

  expect(result.valid).toBe(true);
});

test("fails on invalid email format", () => {
  const schema = { email: { type: "email" } };
  const result = runValidation(schema, { email: "notanemail" });

  expect(result.valid).toBe(false);
  expect(result.errors.email).toBe("Invalid email format");
});

test("passes on valid email format", () => {
  const schema = { email: { type: "email" } };
  const result = runValidation(schema, { email: "sachit@gmail.com" });

  expect(result.valid).toBe(true);
});