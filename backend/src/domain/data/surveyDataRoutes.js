import express from 'express';

export default (surveyDataModel) => {
  const routes = express();

  routes.get('/', async (request, response) => {
    let surveysData = await surveyDataModel.find().exec();

    response.send(surveysData);
  });

  routes.get('/:id', async (request, response) => {
    let surveyData = await surveyDataModel.findOne({
      surveyDataId: request.params.id
    }).exec();

    response.send(surveyData);
  });

  routes.post('/', async (request, response) => {
    let createdSurveyData = await surveyDataModel.create(request.body);

    response
      .status(201)
      .send(createdSurveyData);
  });

  return routes;
};
