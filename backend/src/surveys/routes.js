import express from 'express';
import Survey from './surveyModel';

const route = express();

route.get('/', async (request, response) => {
  let surveys = await Survey.find().exec();
  return surveys;
});

export default route;
