import surveyValidators from '../../../../src/domain/surveys/surveyValidators.js';

describe('The survey validation module', () => {
  it('validates the description in the create survey request body', () => {
    let request = {
      originalUrl: '/surveys',
      method: 'POST',
      body: {
        'numberOfChoices': 5,
        'items': [
          {
            'id': 1,
            'statement': 'Statement 1.'
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

  it('validates the number of choices in the create survey request body', () => {
    let request = {
      originalUrl: '/surveys',
      method: 'POST',
      body: {
        'description': 'Survey 1.',
        'items': [
          {
            'id': 1,
            'statement': 'Statement 1.'
          }
        ]
      }
    };

    let errors = applyMatchingValidatorsTo(request);

    expect(errors).toHaveLength(1);
    expect(errors).toEqual(expect.arrayContaining([
      {
        path: 'numberOfChoices',
        message: 'Number of choices is required.'
      }
    ]));
  });

  it('validates the items in the create survey request body', () => {
    let request = {
      originalUrl: '/surveys',
      method: 'POST',
      body: {
        'description': 'Survey 1.',
        'numberOfChoices': 5
      }
    };

    let errors = applyMatchingValidatorsTo(request);

    expect(errors).toHaveLength(1);
    expect(errors).toEqual(expect.arrayContaining([
      {
        path: 'items',
        message: 'Survey items are required.'
      }
    ]));
  });

  it('validates the item ID in the create survey request body', () => {
    let request = {
      originalUrl: '/surveys',
      method: 'POST',
      body: {
        'description': 'Survey 1.',
        'numberOfChoices': 5,
        'items': [
          {
            'statement': 'Statement 1.'
          },
          {
            'id': 2,
            'statement': 'Statement 2.'
          }
        ]
      }
    };

    let errors = applyMatchingValidatorsTo(request);

    expect(errors).toHaveLength(1);
    expect(errors).toEqual(expect.arrayContaining([
      {
        path: 'items[0].id',
        message: 'Survey item ID is required.'
      }
    ]));
  });

  it('validates the item statement in the create survey request body', () => {
    let request = {
      originalUrl: '/surveys',
      method: 'POST',
      body: {
        'description': 'Survey 1.',
        'numberOfChoices': 5,
        'items': [
          {
            'id': 1,
            'statement': 'Statement 1.'
          },
          {
            'id': 2,
          }
        ]
      }
    };

    let errors = applyMatchingValidatorsTo(request);

    expect(errors).toHaveLength(1);
    expect(errors).toEqual(expect.arrayContaining([
      {
        path: 'items[1].statement',
        message: 'Survey item statement is required.'
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
