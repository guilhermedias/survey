import express from 'express';
import surveys from './surveys/routes.js';

const app = express();
const port = process.env.BACKEND_PORT || 3004;

app.use(surveys);

export default app.listen(port, () => { 
  console.log(`Survey backend listening at http://localhost:${port}`); 
});
