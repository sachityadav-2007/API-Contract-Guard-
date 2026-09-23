function formatErrorResponse(errors) {
  return {
    success: false,
    message: "Validation failed",
    errors
  };
}

module.exports = { formatErrorResponse };