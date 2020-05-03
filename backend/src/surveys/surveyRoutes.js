import express from 'express';

let filterInternalFields = (response) => {
  return JSON.parse(
    JSON.stringify(response, (key, value) =>
      key.startsWith('_') ? undefined : value
    )
  );
}

export default (surveyModel) => {
  const routes = express();

  routes.get('/', async (request, response) => {
    let surveys = await surveyModel.find().exec();

    response.send(filterInternalFields(surveys));
  });

  routes.get('/:id', async (request, response) => {
    let survey = await surveyModel.findOne({
      id: request.params.id
    }).exec();

    response.send(filterInternalFields(survey));
  });

  routes.post('/', async (request, response) => {
    let createdSurvey = await surveyModel.create(request.body);

    response
      .status(201)
      .send(filterInternalFields(createdSurvey));
  });

  return routes;
};
