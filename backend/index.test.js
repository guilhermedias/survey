import app from './index';
import supertest from 'supertest';

describe('Survey controller', () => {
  afterEach(() => {
    app.close();
  });

  it('serves survey information', async () => {
    await supertest(app)
      .get('/')
      .expect(200);
  });
});
