import mongoose from 'mongoose';

export default (autoIncrementPlugin) => {
  let itemDataSchema = new mongoose.Schema({
    id: Number,
    selected: Number
  });

  let surveyDataSchema = new mongoose.Schema({
    surveyDataId: Number,
    surveyId: Number,
    items: [ itemDataSchema ]
  }, {
    collection: 'surveyData'
  });

  surveyDataSchema.plugin(autoIncrementPlugin, {
    inc_field: 'surveyDataId'
  });

  return mongoose.model('SurveyData', surveyDataSchema);
};
