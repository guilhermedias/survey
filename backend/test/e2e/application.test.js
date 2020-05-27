import axios from 'axios';
import mongoose from 'mongoose';

describe('The survey application', () => {
  beforeAll(async () => {
    await mongoose.connect(
      'mongodb://survey:survey@localhost:27017/survey', {
        useNewUrlParser: true
      });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    mongoose.connection.collection('surveys').deleteMany({
      surveyId: { $ne: 1 }
    });
  });

  it('creates a survey', async () => {
    let response = await axios.post('http://localhost:3004/surveys', {
      "description": "Survey.",
      "numberOfChoices": 5,
      "items": [
        {
          "id": 1,
          "statement": "Statement 1."
        }
      ]
    });

    expect(response.status).toBe(201);

    let survey = response.data;
    expect(survey.description).toBe('Survey.');
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

  it('gets all surveys', async () => {
    let response = await axios.get('http://localhost:3004/surveys');

    expect(response.status).toBe(200);
    expect(response.data).toHaveLength(1);

    let survey = response.data[0];
    expect(survey.surveyId).toBe(1);
    expect(survey.description).toBe('Survey 1.');
    expect(survey.numberOfChoices).toBe(5);
    expect(survey.items).toHaveLength(2);

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
    expect(survey.surveyId).toBe(1);
    expect(survey.description).toBe('Survey 1.');
    expect(survey.numberOfChoices).toBe(5);
    expect(survey.items).toHaveLength(2);

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
    try {
      await axios.get('http://localhost:3004/surveys/2');
      fail();
    } catch(error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toBe('');
    }
  });

  it('updates survey by ID', async () => {
    let response = await axios.post('http://localhost:3004/surveys', {
      "description": "Survey.",
      "numberOfChoices": 5,
      "items": [
        {
          "id": 1,
          "statement": "Statement 1."
        }
      ]
    });

    let surveyId = response.data.surveyId;

    response = await axios.put(`http://localhost:3004/surveys/${surveyId}`, {
      "description": "Updated survey.",
      "numberOfChoices": 5,
      "items": [
        {
          "id": 1,
          "statement": "Statement 1."
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
    try {
      response = await axios.put('http://localhost:3004/surveys/2', {
        "description": "Updated survey.",
        "numberOfChoices": 5,
        "items": [
          {
            "id": 1,
            "statement": "Statement 1."
          }
        ]
      });
      fail();
    } catch(error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toBe('');
    }
  });

  it('deletes survey by ID', async () => {
    let response = await axios.post('http://localhost:3004/surveys', {
      "description": "Survey.",
      "numberOfChoices": 5,
      "items": [
        {
          "id": 1,
          "statement": "Statement 1."
        }
      ]
    });

    let surveyId = response.data.surveyId;

    response = await axios.delete(`http://localhost:3004/surveys/${surveyId}`);

    expect(response.status).toBe(204);
    expect(response.data).toBe('');

    try {
      response = await axios.get(`http://localhost:3004/surveys/${surveyId}`);
    } catch(error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toBe('');
    }
  });
});
