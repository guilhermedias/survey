import mongoose from 'mongoose';


export default (autoIncrementPlugin) => {
  let surveySchema = new mongoose.Schema({
    description: String
  });

  surveySchema.plugin(autoIncrementPlugin, {
    inc_field: 'id'
  });

  return mongoose.model('Survey', surveySchema);
};
