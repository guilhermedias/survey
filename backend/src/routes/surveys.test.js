import express from 'express';
import surveys from './surveys';
import supertest from 'supertest';

describe('Survey controller', () => {
  const app = express().use(surveys);

  it('serves survey information', async () => {
    await supertest(app)
      .get('/')
      .expect(200);
  });
});
