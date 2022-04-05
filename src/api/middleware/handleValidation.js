import { validationResult } from "express-validator";

export const handleValidationErrors = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array();
    let errorMessages = {};
    errorsArray.forEach((error) => {
      errorMessages[error.param] = error.msg;
    });
    return res
      .status(422)
      .json({errors: errorMessages });
  }
  next();
};
