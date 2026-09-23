function checkMin(value, min) {
  return value >= min;
}

function checkMax(value, max) {
  return value <= max;
}

function checkMinLength(value, minLength) {
  return typeof value === "string" && value.length >= minLength;
}

function checkMaxLength(value, maxLength) {
  return typeof value === "string" && value.length <= maxLength;
}

module.exports = { checkMin, checkMax, checkMinLength, checkMaxLength };
