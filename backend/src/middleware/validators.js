import surveyValidators from '../domain/surveys/surveyValidators.js';

const validators = surveyValidators;

export default (request, response, next) => {
  let validationErrors = [];

  validators.forEach((validator) => {
    if(validator.matches(request)) {
      validationErrors = validationErrors.concat(validator.verify(request));
    }
  });

  if(validationErrors.length > 0) {
    response
      .status(400)
      .send({
        errors: validationErrors
      });
  } else {
    next();
  }
};
