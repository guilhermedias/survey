import express from 'express';
import Survey from './surveyModel.js';

const route = express();

route.get('/', async (request, response) => {
  let surveys = await Survey.find().exec();
  response.send(surveys);
});

export default route;
