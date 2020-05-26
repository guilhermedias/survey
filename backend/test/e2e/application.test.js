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
    let response = await axios.post('htpp://localhost:3004/surveys', {
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
    let response = await axios.get('htpp://localhost:3004/surveys');

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
});
