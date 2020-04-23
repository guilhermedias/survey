import express from 'express';
import surveys from './routes';
import Survey from './surveyModel';
import supertest from 'supertest';

jest.mock('./surveyModel');

let app;

describe('Survey controller', () => {
  beforeAll(() => {
    app = express()
      .use(surveys)
      .listen(3004);
  });

  afterAll(() => {
    app.close();
  });

  it('serves survey information', () => {
    let query = {
      exec: jest.fn().mockResolvedValue(
        [ { id: 1 } ]
      )
    };

    Survey.find.mockReturnValue(query);

    supertest(app)
      .get('/')
      .expect([ { id: 1 } ]);
  });
});
