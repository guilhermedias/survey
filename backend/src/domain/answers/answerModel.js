import mongoose from 'mongoose';

export default (autoIncrementPlugin) => {
  let itemAnswerSchema = new mongoose.Schema({
    id: Number,
    selected: Number
  });

  let answerSchema = new mongoose.Schema({
    answerId: Number,
    surveyId: Number,
    items: [ itemAnswerSchema ]
  });

  answerSchema.plugin(autoIncrementPlugin, {
    inc_field: 'answerId'
  });

  return mongoose.model('Answer', answerSchema);
};
