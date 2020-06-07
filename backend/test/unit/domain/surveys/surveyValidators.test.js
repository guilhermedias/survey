import surveyValidators from '../../../../src/domain/surveys/surveyValidators.js';

describe('The survey validation module', () => {
  it('validates the description field in the create survey request body', () => {
    let request = {
      originalUrl: '/surveys',
      method: 'POST',
      body: {
        "numberOfChoices": 5,
        "items": [
          {
            "id": 1,
            "statement": "Statement 1."
          }
        ]
      }
    };

    let errors = applyMatchingValidatorsTo(request);

    expect(errors).toHaveLength(1);
    expect(errors).toEqual(expect.arrayContaining([
      {
        path: 'description',
        message: 'Survey description is required.'
      }
    ]));
  });
});

function applyMatchingValidatorsTo(request) {
  let errors = [];

  surveyValidators.forEach((validator) => {
    if(validator.matches(request)) {
      errors = errors.concat(validator.verify(request));
    }
  });

  return errors;
}
