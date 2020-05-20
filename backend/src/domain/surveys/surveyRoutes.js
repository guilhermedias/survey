import express from 'express';

export default (surveyModel) => {
  const routes = express();

  routes.get('/', async (request, response) => {
    let surveys = await surveyModel.find().exec();

    response.send(surveys);
  });

  routes.get('/:id', async (request, response) => {
    let survey = await surveyModel.findOne({
      surveyId: request.params.id
    }).exec();

    response.send(survey);
  });

  routes.post('/', async (request, response) => {
    let createdSurvey = await surveyModel.create(request.body);

    response
      .status(201)
      .send(createdSurvey);
  });

  routes.delete('/:id', async (request, response) => {
    await surveyModel.deleteOne({
      surveyId: request.params.id
    }).exec();

    response
      .status(204)
      .send();
  });

  return routes;
};
