import express from 'express';
import bodyParser from 'body-parser';

export default (surveyModel) => {
  const routes = express();

  routes.use(bodyParser.json());

  routes.get('/', async (request, response) => {
    let surveys = await surveyModel.find().exec();
    response.send(surveys);
  });

  routes.get('/:id', async (request, response) => {
    let survey = await surveyModel.findOne({
      id: request.params.id
    }).exec();

    response.send(survey);
  });

  routes.post('/', async (request, response) => {
    console.log(request.body);
    response.sendStatus(201);
  });

  return routes;
};
