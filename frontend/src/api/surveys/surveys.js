import axios from 'axios';
import baseURL from '../baseURL';

class SurveysAPI {
  static async getSurveyByID(id) {
    let response = await axios.get(`${baseURL}/surveys/${id}`);
    return response.data;
  }

  static async saveAnswer(answer) {
    let response = await axios.post(`${baseURL}/answers`, answer);
    return response.data;
  }
}

export default SurveysAPI;
