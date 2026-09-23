const { runValidation } = require("../validator/validator");
const { formatErrorResponse } = require("../errors/validationError");

function validate(schema) {
  return function (req, res, next) {
    const result = runValidation(schema, req.body);

    if (!result.valid) {
      return res.status(422).json(formatErrorResponse(result.errors));
    }

    next();
  };
}

module.exports = { validate };