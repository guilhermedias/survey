import axios from 'axios';
import mongoose from 'mongoose';

describe('The survey routes group', () => {
  beforeAll(async () => {
    await mongoose.connect(
      'mongodb://survey:survey@localhost:27017/survey', {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useCreateIndex: true
      });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await mongoose.connection.collection('surveys').deleteMany({
      surveyId: { $ne: 1 }
    });
  });

  it('creates a survey', async () => {
    let response = await axios.post('http://localhost:3004/surveys', {
      'description': 'Survey.',
      'numberOfChoices': 5,
      'items': [
        {
          'id': 1,
          'statement': 'Statement 1.'
        }
      ]
    });

    expect(response.status).toBe(201);

    let survey = response.data;
    expect(survey).toHaveProperty('surveyId');
  });

  it('applies the validation', async () => {
    let response = await captureHttpErrorResponse(async () => {
      await axios.post('http://localhost:3004/surveys', {
        'numberOfChoices': 5,
        'items': [
          {
            'id': 1,
            'statement': 'Statement 1.'
          }
        ]
      });
    });

    expect(response.status).toBe(400);

    let errors = response.data.errors;
    expect(errors).toEqual(expect.arrayContaining([
      {
        path: 'description',
        message: 'Survey description is required.'
      }
    ]));
  });

  it('gets all surveys', async () => {
    let response = await axios.get('http://localhost:3004/surveys');

    expect(response.status).toBe(200);
    expect(response.data).toHaveLength(1);

    let survey = response.data[0];
    expect(survey.description).toBe('Survey 1.');
    expect(survey.numberOfChoices).toBe(5);
    expect(survey.items).toHaveLength(2);
    expect(survey.surveyId).toBe(1);

    let items = survey.items;
    expect(items).toEqual(expect.arrayContaining([
      {
        id: 1,
        statement: 'Statement 1.'
      },
      {
        id: 2,
        statement: 'Statement 2.'
      }
    ]));
  });

  it('gets survey by ID', async () => {
    let response = await axios.get('http://localhost:3004/surveys/1');

    expect(response.status).toBe(200);

    let survey = response.data;
    expect(survey.description).toBe('Survey 1.');
    expect(survey.numberOfChoices).toBe(5);
    expect(survey.items).toHaveLength(2);
    expect(survey.surveyId).toBe(1);

    let items = survey.items;
    expect(items).toEqual(expect.arrayContaining([
      {
        id: 1,
        statement: 'Statement 1.'
      },
      {
        id: 2,
        statement: 'Statement 2.'
      }
    ]));
  });

  it('returns 404 Not Found when trying to retrieve a nonexisting survey', async () => {
    assertThatItThrows404NotFound(async () => {
      await axios.get('http://localhost:3004/surveys/2');
    });
  });

  it('updates survey by ID', async () => {
    let surveyId = await createSurveyWithDefaultValues();

    let response = await axios.put(`http://localhost:3004/surveys/${surveyId}`, {
      'description': 'Updated survey.',
      'numberOfChoices': 5,
      'items': [
        {
          'id': 1,
          'statement': 'Statement 1.'
        }
      ]
    });

    expect(response.status).toBe(204);
    expect(response.data).toBe('');

    response = await axios.get(`http://localhost:3004/surveys/${surveyId}`);

    let survey = response.data;
    expect(survey.description).toBe('Updated survey.');
    expect(survey.numberOfChoices).toBe(5);
    expect(survey.items).toHaveLength(1);

    let items = survey.items;
    expect(items).toEqual(expect.arrayContaining([
      {
        id: 1,
        statement: 'Statement 1.'
      }
    ]));
  });

  it('returns 404 Not Found when trying to update a nonexisting survey', async () => {
    assertThatItThrows404NotFound(async () => {
      await axios.put('http://localhost:3004/surveys/2', {
        'description': 'Updated survey.',
        'numberOfChoices': 5,
        'items': [
          {
            'id': 1,
            'statement': 'Statement 1.'
          }
        ]
      });
    });
  });

  it('deletes survey by ID', async () => {
    let surveyId = await createSurveyWithDefaultValues();

    let response = await axios.delete(`http://localhost:3004/surveys/${surveyId}`);

    expect(response.status).toBe(204);
    expect(response.data).toBe('');

    assertThatItThrows404NotFound(async () => {
      await axios.get(`http://localhost:3004/surveys/${surveyId}`);
    });
  });

  it('returns 404 Not Found when trying to delete a nonexisting survey', async () => {
    assertThatItThrows404NotFound(async () => {
      await axios.delete('http://localhost:3004/surveys/2');
    });
  });
});

async function createSurveyWithDefaultValues() {
  let response = await axios.post('http://localhost:3004/surveys', {
    'description': 'Survey.',
    'numberOfChoices': 5,
    'items': [
      {
        'id': 1,
        'statement': 'Statement 1.'
      }
    ]
  });

  return response.data.surveyId;
}

async function captureHttpErrorResponse(httpRequestCodeBlock) {
  try {
    await httpRequestCodeBlock();
    fail('Expected error response, but request suceeded');
  } catch(error) {
    return error.response;
  }
}

async function assertThatItThrows404NotFound(httpRequestCodeBlock) {
  let response = await captureHttpErrorResponse(httpRequestCodeBlock);
  expect(response.status).toBe(404);
  expect(response.data).toBe('');
}
