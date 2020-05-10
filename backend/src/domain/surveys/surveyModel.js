import mongoose from 'mongoose';

export default (autoIncrementPlugin) => {
  let likertItemSchema = new mongoose.Schema({
    id: Number,
    statement: String
  });

  let surveySchema = new mongoose.Schema({
    surveyId: Number,
    description: String,
    numberOfChoices: Number,
    items: [ likertItemSchema ]
  });

  surveySchema.plugin(autoIncrementPlugin, {
    inc_field: 'surveyId'
  });

  return mongoose.model('Survey', surveySchema);
};
