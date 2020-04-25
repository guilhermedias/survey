import express from 'express';
import mongoose from 'mongoose';
import surveys from './surveys/surveyRoutes.js';

const app = express();
const port = process.env.BACKEND_PORT || 3004;

const user = process.env.DATABASE_USERNAME || 'survey';
const pass = process.env.DATABASE_PASSWORD || 'survey';

app.use(surveys);

mongoose.connect(`mongodb://${user}:${pass}@localhost:27017/survey`, {
  useNewUrlParser: true
});

app.listen(port, () => {
  console.log(`Survey backend listening at http://localhost:${port}`); 
});
