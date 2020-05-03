import mongoose from 'mongoose';


export default (autoIncrementPlugin) => {
  let surveySchema = new mongoose.Schema({
    _id: Number,
    description: String
  }, {
    _id: false
  });

  surveySchema.plugin(autoIncrementPlugin, {
    inc_field: 'id'
  });

  return mongoose.model('Survey', surveySchema);
};
