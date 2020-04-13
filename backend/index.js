import express from 'express';

const app = express();
const port = process.env.BACKEND_PORT || 3004;

app.get('/', (request, response) => {
  response.send('Ae');
});

app.listen(port, () => { 
  console.log(`Survey backend listening at http://localhost:${port}`); 
});
