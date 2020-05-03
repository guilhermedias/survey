import mongoose from 'mongoose';


export default (autoIncrementPlugin) => {
  let itemSchema = new mongoose.Schema({
    id: Number,
    statement: String
  });

  let surveySchema = new mongoose.Schema({
    _id: Number,
    description: String,
    numberOfChoices: Number,
    items: [ itemSchema ]
  }, {
    _id: false
  });

  surveySchema.plugin(autoIncrementPlugin, {
    inc_field: 'id'
  });

  return mongoose.model('Survey', surveySchema);
};
