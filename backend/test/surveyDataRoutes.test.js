import axios from 'axios';
import mongoose from 'mongoose';

describe('The survey data routes group', () => {
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
    await mongoose.connection.collection('surveyData').deleteMany({
      $and: [
        { surveyDataId: { $ne: 1 } },
        { surveyDataId: { $ne: 2 } }
      ]
    });
  });

  it('creates survey data', async () => {
    let response = await axios.post('http://localhost:3004/data', {
      "surveyId": 1,
      "items": [
        {
          "id": 1,
          "selected": 4
        }
      ]
    });

    expect(response.status).toBe(201);

    let surveyData = response.data;
    expect(surveyData.surveyId).toBe(1);
    expect(surveyData.items).toHaveLength(1);

    let items = surveyData.items;
    expect(items).toEqual(expect.arrayContaining([
      {
        id: 1,
        selected: 4
      }
    ]));
  });

  it('gets all survey data', async () => {
    let response = await axios.get('http://localhost:3004/data');

    expect(response.status).toBe(200);
    expect(response.data).toHaveLength(2);

    let surveyData = response.data[0];
    expect(surveyData.surveyId).toBe(1);
    expect(surveyData.items).toHaveLength(2);
    expect(surveyData.surveyDataId).toBe(1);

    let items = surveyData.items;
    expect(items).toEqual(expect.arrayContaining([
      {
        id: 1,
        selected: 4
      },
      {
        id: 2,
        selected: 5
      }
    ]));

    surveyData = response.data[1];
    expect(surveyData.surveyId).toBe(1);
    expect(surveyData.items).toHaveLength(2);
    expect(surveyData.surveyDataId).toBe(2);

    items = surveyData.items;
    expect(items).toEqual(expect.arrayContaining([
      {
        id: 1,
        selected: 4
      },
      {
        id: 2,
        selected: 5
      }
    ]));
  });

  it('gets survey data by ID', async () => {
    let response = await axios.get('http://localhost:3004/data/1');

    expect(response.status).toBe(200);

    let surveyData = response.data;
    expect(surveyData.surveyId).toBe(1);
    expect(surveyData.items).toHaveLength(2);
    expect(surveyData.surveyDataId).toBe(1);

    let items = surveyData.items;
    expect(items).toEqual(expect.arrayContaining([
      {
        id: 1,
        selected: 4
      },
      {
        id: 2,
        selected: 5
      }
    ]));
  });

  it('returns 404 Not Found when trying to retrieve nonexisting survey data', async () => {
    assertThatItThrows404NotFound(async () => {
      await axios.get('http://localhost:3004/data/3');
    });
  });

  it('updates survey data by ID', async () => {
    let surveyDataId = await createSurveyDataWithDefaultValues();

    let response = await axios.put(`http://localhost:3004/data/${surveyDataId}`, {
      "surveyId": 1,
      "items": [
        {
          "id": 1,
          "selected": 1
        }
      ]
    });

    expect(response.status).toBe(204);
    expect(response.data).toBe('');

    response = await axios.get(`http://localhost:3004/data/${surveyDataId}`);

    let surveyData = response.data;
    expect(surveyData.surveyId).toBe(1);
    expect(surveyData.items).toHaveLength(1);

    let items = surveyData.items;
    expect(items).toEqual(expect.arrayContaining([
      {
        id: 1,
        selected: 1
      }
    ]));
  });

  it('returns 404 Not Found when trying to update nonexisting survey data', async () => {
    assertThatItThrows404NotFound(async () => {
      await axios.put('http://localhost:3004/data/3', {
        "surveyId": 1,
        "items": [
          {
            "id": 1,
            "selected": 1
          }
        ]
      });
    });
  });

  it('deletes survey data by ID', async () => {
    let surveyId = await createSurveyDataWithDefaultValues();

    let response = await axios.delete(`http://localhost:3004/data/${surveyId}`);

    expect(response.status).toBe(204);
    expect(response.data).toBe('');

    assertThatItThrows404NotFound(async () => {
      await axios.get(`http://localhost:3004/data/${surveyId}`);
    });
  });

  it('returns 404 Not Found when trying to delete nonexisting survey data', async () => {
    assertThatItThrows404NotFound(async () => {
      await axios.delete('http://localhost:3004/data/3');
    });
  });
});

async function createSurveyDataWithDefaultValues() {
  let response = await axios.post('http://localhost:3004/data', {
    "surveyId": 1,
    "items": [
      {
        "id": 1,
        "selected": 4
      }
    ]
  });

  return response.data.surveyDataId;
}

async function assertThatItThrows404NotFound(httpRequestCodeBlock) {
  try {
    await httpRequestCodeBlock();
    fail('Expected 404 Not Found, but request suceeded');
  } catch(error) {
    expect(error.response.status).toBe(404);
    expect(error.response.data).toBe('');
  }
}
