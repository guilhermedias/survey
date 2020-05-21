import express from 'express';

export default (surveyDataModel) => {
  const routes = express();

  routes.post('/', async (request, response) => {
    let newSurveyData = request.body;

    let createdSurveyData = await surveyDataModel.create(newSurveyData);

    response
      .status(201)
      .send(createdSurveyData);
  });

  routes.get('/', async (request, response) => {
    let filter = {};

    if(request.query.surveyId) {
      filter.surveyId = request.query.surveyId;
    }

    let surveysData = await surveyDataModel.find(filter).exec();

    response.send(surveysData);
  });

  routes.get('/:id', async (request, response) => {
    let query = {
      surveyDataId: request.params.id
    };

    let surveyData = await surveyDataModel.findOne(query).exec();

    response.send(surveyData);
  });

  routes.delete('/:id', async (request, response) => {
    let query = {
      surveyDataId: request.params.id
    };

    await surveyDataModel.deleteOne(query).exec();

    response
      .status(204)
      .send();
  });

  return routes;
};
