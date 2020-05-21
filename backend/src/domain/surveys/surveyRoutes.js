import express from 'express';

export default (surveyModel) => {
  const routes = express();

  routes.post('/', async (request, response) => {
    let newSurvey = request.body;

    let createdSurvey = await surveyModel.create(newSurvey);

    response
      .status(201)
      .send(createdSurvey);
  });

  routes.get('/', async (request, response) => {
    let surveys = await surveyModel.find().exec();

    response.send(surveys);
  });

  routes.get('/:id', async (request, response) => {
    let query = {
      surveyId: request.params.id
    };

    let survey = await surveyModel.findOne(query).exec();

    response.send(survey);
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
    let query = {
      surveyId: request.params.id
    };

    await surveyModel.deleteOne(query).exec();

    response
      .status(204)
      .send();
  });

  return routes;
};
