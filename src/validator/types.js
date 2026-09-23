function isString(value) {
  return typeof value === "string";
}

function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

function isBoolean(value) {
  return typeof value === "boolean";
}

function isEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof value === "string" && emailRegex.test(value);
}

module.exports = { isString, isNumber, isBoolean, isEmail };
