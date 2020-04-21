import express from 'express';
import surveys from './routes';
import Survey from './surveyModel';
import supertest from 'supertest';

jest.mock('./surveyModel');

describe('Survey controller', () => {
  const app = express().use(surveys);

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
