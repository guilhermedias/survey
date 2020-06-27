import express from 'express';

export default (answerModel) => {
  const routes = express();

  routes.post('/', async (request, response) => {
    let newAnswer = request.body;

    let createdAnswer = await answerModel.create(newAnswer);

    response
      .status(201)
      .send({
        answerId: createdAnswer.answerId
      });
  });

  routes.get('/', async (request, response) => {
    let filter = {};

    if(request.query.surveyId) {
      filter.surveyId = request.query.surveyId;
    }

    let answers = await answerModel.find(filter).exec();

    response.send(answers);
  });

  routes.get('/:id', async (request, response) => {
    let query = {
      answerId: request.params.id
    };

    let answer = await answerModel.findOne(query).exec();

    let statusCode = answer
      ? 200
      : 404;

    response
      .status(statusCode)
      .send(answer);
  });

  routes.put('/:id', async (request, response) => {
    let query = {
      answerId: request.params.id
    };

    let newAnswer = request.body;

    let result = await answerModel.updateOne(query, newAnswer).exec();

    let statusCode = result.nModified > 0
      ? 204
      : 404;

    response
      .status(statusCode)
      .send();
  });

  routes.delete('/:id', async (request, response) => {
    let query = {
      answerId: request.params.id
    };

    let result = await answerModel.deleteOne(query).exec();

    let statusCode = result.n > 0
      ? 204
      : 404;

    response
      .status(statusCode)
      .send();
  });

  return routes;
};
