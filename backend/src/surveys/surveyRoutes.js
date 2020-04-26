import express from 'express';

export default (surveyModel) => {
  const routes = express();

  routes.get('/', async (request, response) => {
    let surveys = await surveyModel.find().exec();
    response.send(surveys);
  });

  return routes;
};
