import express from 'express';

export default (surveyModel) => {
  const routes = express();

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

  return routes;
};
