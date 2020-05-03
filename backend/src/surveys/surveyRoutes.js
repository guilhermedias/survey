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
    let id = request.params.id;
    let survey = await surveyModel.findById(id).exec();

    response.send(survey);
  });

  routes.post('/', async (request, response) => {
    console.log(request.body);
    response.sendStatus(201);
  });

  return routes;
};
