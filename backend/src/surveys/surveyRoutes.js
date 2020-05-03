import express from 'express';

export default (surveyModel) => {
  const routes = express();

  routes.get('/', async (request, response) => {
    let surveys = await surveyModel.find().exec();
    response.send(surveys);
  });

  routes.get('/:id', async (request, response) => {
    let id = request.params.id;
    let survey = await surveyModel.findById(id).exec();

    response.send(survey);
  });

  return routes;
};
