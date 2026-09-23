const { isString, isNumber, isBoolean, isEmail } = require("./types");
const { checkMin, checkMax, checkMinLength, checkMaxLength } = require("./rules");

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

    if (value === undefined) continue;

    if (rules.type && typeCheckers[rules.type]) {
      const { check, message } = typeCheckers[rules.type];
      if (!check(value)) {
        errors[field] = message;
        continue; // type hi galat hai toh aage ki rules check karne ka matlab nahi
      }
    }

    if (rules.min !== undefined && !checkMin(value, rules.min)) {
      errors[field] = `Value must be at least ${rules.min}`;
    }

    if (rules.max !== undefined && !checkMax(value, rules.max)) {
      errors[field] = `Value must be at most ${rules.max}`;
    }

    if (rules.minLength !== undefined && !checkMinLength(value, rules.minLength)) {
      errors[field] = `Minimum ${rules.minLength} characters required`;
    }

    if (rules.maxLength !== undefined && !checkMaxLength(value, rules.maxLength)) {
      errors[field] = `Maximum ${rules.maxLength} characters allowed`;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

module.exports = { runValidation };