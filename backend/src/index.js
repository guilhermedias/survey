import express from 'express';
import mongoose from 'mongoose';
import PluginFactory from 'mongoose-sequence';
import SurveyModel from './surveys/surveyModel.js';
import SurveyRoutes from './surveys/surveyRoutes.js';

(async () => {
  const app = express();
  const port = process.env.SERVER_PORT || 3004;
  const databaseUsername = process.env.DATABASE_USERNAME || 'survey';
  const databasePassword = process.env.DATABASE_PASSWORD || 'survey';

  // Mongoose configuration
  let databaseURL = `mongodb://${databaseUsername}:${databasePassword}@localhost:27017/survey`;

  let connection = await mongoose.connect(databaseURL, {
    useNewUrlParser: true
  });

  let autoIncrementPlugin = PluginFactory(connection);

  let surveyModel = SurveyModel(autoIncrementPlugin);

  // Express configuration
  app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    next();
  });

  let surveyRoutes = SurveyRoutes(surveyModel);

  app.use('/surveys', surveyRoutes);

  app.listen(port, () => {
    console.log(`Survey backend listening at http://localhost:${port}`); 
  });
})();
