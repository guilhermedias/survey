import answerValidators from '../../../../src/domain/answers/answerValidators.js';

describe('The answer validation module', () => {
  it('validates the survey ID in the create answer request body', () => {
    let request = buildCreateAnswerRequest({
      'items': [
        {
          'id': 1,
          'selected': 4
        }
      ]
    });

    let errors = applyMatchingValidatorsTo(request);

    assertThatErrorsContainsExactly(errors, {
      path: 'surveyId',
      message: 'Survey ID is required.'
    });
  });

  it('validates the items in the create answer request body', () => {
    let request = buildCreateAnswerRequest({
      'surveyId': 1
    });

    let errors = applyMatchingValidatorsTo(request);

    assertThatErrorsContainsExactly(errors, {
      path: 'items',
      message: 'Answer items are required.'
    });
  });

  it('validates the item ID in the create answer request body', () => {
    let request = buildCreateAnswerRequest({
      'surveyId': 1,
      'items': [
        {
          'selected': 4
        }
      ]
    });

    let errors = applyMatchingValidatorsTo(request);

    assertThatErrorsContainsExactly(errors, {
      path: 'items[0].id',
      message: 'Answer item ID is required.'
    });
  });

  it('validates the selected choice in the create answer request body', () => {
    let request = buildCreateAnswerRequest({
      'surveyId': 1,
      'items': [
        {
          'id': 1,
          'selected': 4
        },
        {
          'id': 1
        }
      ]
    });

    let errors = applyMatchingValidatorsTo(request);

    assertThatErrorsContainsExactly(errors, {
      path: 'items[1].selected',
      message: 'Answer item selected choice is required.'
    });
  });

  it('validates the survey ID in the update answer request body', () => {
    let request = buildUpdateAnswerRequest({
      'items': [
        {
          'id': 1,
          'selected': 4
        }
      ]
    });

    let errors = applyMatchingValidatorsTo(request);

    assertThatErrorsContainsExactly(errors, {
      path: 'surveyId',
      message: 'Survey ID is required.'
    });
  });

  it('validates the items in the update answer request body', () => {
    let request = buildUpdateAnswerRequest({
      'surveyId': 1
    });

    let errors = applyMatchingValidatorsTo(request);

    assertThatErrorsContainsExactly(errors, {
      path: 'items',
      message: 'Answer items are required.'
    });
  });

  it('validates the item ID in the update answer request body', () => {
    let request = buildUpdateAnswerRequest({
      'surveyId': 1,
      'items': [
        {
          'selected': 4
        }
      ]
    });

    let errors = applyMatchingValidatorsTo(request);

    assertThatErrorsContainsExactly(errors, {
      path: 'items[0].id',
      message: 'Answer item ID is required.'
    });
  });

  it('validates the selected choice in the update answer request body', () => {
    let request = buildUpdateAnswerRequest({
      'surveyId': 1,
      'items': [
        {
          'id': 1,
          'selected': 4
        },
        {
          'id': 1
        }
      ]
    });

    let errors = applyMatchingValidatorsTo(request);

    assertThatErrorsContainsExactly(errors, {
      path: 'items[1].selected',
      message: 'Answer item selected choice is required.'
    });
  });
});

function buildCreateAnswerRequest(requestBody) {
  return {
    originalUrl: '/answers',
    method: 'POST',
    body: requestBody
  };
}

function buildUpdateAnswerRequest(requestBody) {
  return {
    originalUrl: '/answers/1',
    method: 'PUT',
    body: requestBody
  };
}

function applyMatchingValidatorsTo(request) {
  let errors = [];

  answerValidators.forEach((validator) => {
    if(validator.matches(request)) {
      errors = errors.concat(validator.verify(request));
    }
  });

  return errors;
}

function assertThatErrorsContainsExactly(actualErrors, expectedError) {
  expect(actualErrors).toHaveLength(1);
  expect(actualErrors).toEqual(expect.arrayContaining([ expectedError ]));
}
