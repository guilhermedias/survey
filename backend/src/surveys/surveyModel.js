import mongoose from 'mongoose';


export default (autoIncrementPlugin) => {
  let itemSchema = new mongoose.Schema({
    id: Number,
    statement: String
  });

  let surveySchema = new mongoose.Schema({
    id: Number,
    description: String,
    numberOfChoices: Number,
    items: [ itemSchema ]
  });

  surveySchema.plugin(autoIncrementPlugin, {
    inc_field: 'id'
  });

  return mongoose.model('Survey', surveySchema);
};
