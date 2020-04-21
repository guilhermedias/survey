import mongoose from 'mongoose';

let surveySchema = new mongoose.Schema({
  id: Number
});

export default mongoose.model('Survey', surveySchema);
