import axios from 'axios';
import mongoose from 'mongoose';

describe('The answer routes group', () => {
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
    await mongoose.connection.collection('answers').deleteMany({
      $and: [
        { answerId: { $ne: 1 } },
        { answerId: { $ne: 2 } }
      ]
    });
  });

  it('creates an answer', async () => {
    let response = await axios.post('http://localhost:3004/answers', {
      'surveyId': 1,
      'items': [
        {
          'id': 1,
          'selected': 4
        }
      ]
    });

    expect(response.status).toBe(201);

    let answer = response.data;
    expect(answer).toHaveProperty('answerId');
  });

  it('applies the validation', async () => {
    let response = await captureHttpErrorResponse(async () => {
      await axios.post('http://localhost:3004/answers', {
        'items': [
          {
            'id': 1,
            'selected': 4
          }
        ]
      });
    });

    expect(response.status).toBe(400);

    let errors = response.data.errors;
    expect(errors).toEqual(expect.arrayContaining([
      {
        path: 'surveyId',
        message: 'Survey ID is required.'
      }
    ]));
  });

  it('gets all answers', async () => {
    let response = await axios.get('http://localhost:3004/answers');

    expect(response.status).toBe(200);
    expect(response.data).toHaveLength(2);

    let answer = response.data[0];
    expect(answer.surveyId).toBe(1);
    expect(answer.items).toHaveLength(2);
    expect(answer.answerId).toBe(1);

    let items = answer.items;
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

    answer = response.data[1];
    expect(answer.surveyId).toBe(1);
    expect(answer.items).toHaveLength(2);
    expect(answer.answerId).toBe(2);

    items = answer.items;
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

  it('gets all answers associated with a specific survey', async () => {
    let answerId = await createAnswerWithDefaultValues();

    let response = await axios.get('http://localhost:3004/answers?surveyId=2');

    expect(response.status).toBe(200);
    expect(response.data).toHaveLength(1);

    let answer = response.data[0];
    expect(answer.surveyId).toBe(2);
    expect(answer.items).toHaveLength(1);
    expect(answer.answerId).toBe(answerId);

    let items = answer.items;
    expect(items).toEqual(expect.arrayContaining([
      {
        id: 1,
        selected: 4
      }
    ]));
  });

  it('gets answer by ID', async () => {
    let response = await axios.get('http://localhost:3004/answers/1');

    expect(response.status).toBe(200);

    let answer = response.data;
    expect(answer.surveyId).toBe(1);
    expect(answer.items).toHaveLength(2);
    expect(answer.answerId).toBe(1);

    let items = answer.items;
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

  it('returns 404 Not Found when trying to retrieve nonexisting answer', async () => {
    assertThatItThrows404NotFound(async () => {
      await axios.get('http://localhost:3004/answers/3');
    });
  });

  it('updates answer by ID', async () => {
    let answerId = await createAnswerWithDefaultValues();

    let response = await axios.put(`http://localhost:3004/answers/${answerId}`, {
      'surveyId': 2,
      'items': [
        {
          'id': 1,
          'selected': 1
        }
      ]
    });

    expect(response.status).toBe(204);
    expect(response.data).toBe('');

    response = await axios.get(`http://localhost:3004/answers/${answerId}`);

    let answer = response.data;
    expect(answer.surveyId).toBe(2);
    expect(answer.items).toHaveLength(1);

    let items = answer.items;
    expect(items).toEqual(expect.arrayContaining([
      {
        id: 1,
        selected: 1
      }
    ]));
  });

  it('returns 404 Not Found when trying to update nonexisting answer', async () => {
    assertThatItThrows404NotFound(async () => {
      await axios.put('http://localhost:3004/answers/3', {
        'surveyId': 1,
        'items': [
          {
            'id': 1,
            'selected': 1
          }
        ]
      });
    });
  });

  it('deletes answer by ID', async () => {
    let answerId = await createAnswerWithDefaultValues();

    let response = await axios.delete(`http://localhost:3004/answers/${answerId}`);

    expect(response.status).toBe(204);
    expect(response.data).toBe('');

    assertThatItThrows404NotFound(async () => {
      await axios.get(`http://localhost:3004/answers/${answerId}`);
    });
  });

  it('returns 404 Not Found when trying to delete nonexisting answer', async () => {
    assertThatItThrows404NotFound(async () => {
      await axios.delete('http://localhost:3004/answers/3');
    });
  });
});

async function createAnswerWithDefaultValues() {
  let response = await axios.post('http://localhost:3004/answers', {
    'surveyId': 2,
    'items': [
      {
        'id': 1,
        'selected': 4
      }
    ]
  });

  return response.data.answerId;
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
