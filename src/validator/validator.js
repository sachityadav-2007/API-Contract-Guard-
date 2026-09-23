function runValidation(schema, data) {
  const errors = {};

  for (const field in schema) {
    const rules = schema[field];
    const value = data[field];

    if (rules.required && (value === undefined || value === null || value === "")) {
      errors[field] = "This field is required";
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

module.exports = { runValidation };