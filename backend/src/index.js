import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import PluginFactory from 'mongoose-sequence';
import SurveyModel from './domain/surveys/surveyModel.js';
import SurveyRoutes from './domain/surveys/surveyRoutes.js';
import SurveyDataModel from './domain/data/surveyDataModel.js';
import SurveyDataRoutes from './domain/data/surveyDataRoutes.js';
import corsHeaders from './middleware/corsHeaders.js';
import validators from './middleware/validators.js';
import hideFields from './middleware/hideFields.js';

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

  let surveyRoutes = SurveyRoutes(surveyModel);
  let surveyDataRoutes = SurveyDataRoutes(surveyDataModel);

  // Middleware configuration
  app.use(bodyParser.json());

  app.use(corsHeaders);
  app.use(validators);
  app.use(hideFields);

  app.use('/surveys', surveyRoutes);
  app.use('/data', surveyDataRoutes);

  app.listen(port, () => {
    console.log(`Survey backend listening at http://localhost:${port}`); 
  });
})();
