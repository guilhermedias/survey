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

  routes.put('/:id', async (request, response) => {
    let query = {
      surveyId: request.params.id
    };

    let newSurvey = request.body;

    let result = await surveyModel.updateOne(query, newSurvey).exec();

    let statusCode = result.nModified > 0
      ? 204
      : 404;

    response
      .status(statusCode)
      .send();
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
