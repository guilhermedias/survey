import express from 'express';

const route = express();

route.get('/', (request, response) => {
  response.send('Ae');
});

export default route;
