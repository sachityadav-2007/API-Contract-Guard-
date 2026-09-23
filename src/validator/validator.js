const { isString, isNumber, isBoolean, isEmail } = require("./types");

const typeCheckers = {
  string: { check: isString, message: "Must be a string" },
  number: { check: isNumber, message: "Must be a number" },
  boolean: { check: isBoolean, message: "Must be a boolean" },
  email: { check: isEmail, message: "Invalid email format" }
};

function runValidation(schema, data) {
  const errors = {};

  for (const field in schema) {
    const rules = schema[field];
    const value = data[field];

    if (rules.required && (value === undefined || value === null || value === "")) {
      errors[field] = "This field is required";
      continue;
    }

    if (rules.type && value !== undefined && typeCheckers[rules.type]) {
      const { check, message } = typeCheckers[rules.type];
      if (!check(value)) {
        errors[field] = message;
      }
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

module.exports = { runValidation };