import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import PluginFactory from 'mongoose-sequence';
import SurveyModel from './domain/surveys/surveyModel.js';
import SurveyRoutes from './domain/surveys/surveyRoutes.js';
import SurveyDataModel from './domain/data/surveyDataModel.js';
import SurveyDataRoutes from './domain/data/surveyDataRoutes.js';
import filterInternal from './middleware/filterInternal.js';
import validators from './middleware/validators.js';

(async () => {
  const app = express();
  const port = process.env.SERVER_PORT || 3004;
  const databaseUsername = process.env.DATABASE_USERNAME || 'survey';
  const databasePassword = process.env.DATABASE_PASSWORD || 'survey';

  // Mongoose configuration
  let databaseURL = `mongodb://${databaseUsername}:${databasePassword}@localhost:27017/survey`;

  let connection = await mongoose.connect(databaseURL, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true
  });

  let autoIncrementPlugin = PluginFactory(connection);

  let surveyModel = SurveyModel(autoIncrementPlugin);
  let surveyDataModel = SurveyDataModel(autoIncrementPlugin);

  // Express configuration
  app.use(bodyParser.json());

  app.use(filterInternal);
  app.use(validators);

  app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  let surveyRoutes = SurveyRoutes(surveyModel);
  let surveyDataRoutes = SurveyDataRoutes(surveyDataModel);

  app.use('/surveys', surveyRoutes);
  app.use('/data', surveyDataRoutes);

  app.listen(port, () => {
    console.log(`Survey backend listening at http://localhost:${port}`); 
  });
})();
