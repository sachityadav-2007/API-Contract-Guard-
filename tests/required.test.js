const { runValidation } = require("../src/validator/validator");

test("fails when a required field is missing", () => {
  const schema = {
    email: { required: true }
  };

  const result = runValidation(schema, {}); // empty body, email missing

  expect(result.valid).toBe(false);
  expect(result.errors.email).toBe("This field is required");
});

test("passes when required field is present", () => {
  const schema = {
    email: { required: true }
  };

  const result = runValidation(schema, { email: "sachit@gmail.com" });

  expect(result.valid).toBe(true);
  expect(result.errors).toEqual({});
});