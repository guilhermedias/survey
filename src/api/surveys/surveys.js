import axios from 'axios';
import baseURL from '../baseURL';

class SurveysAPI {
  static async getSurveyByID(id) {
    let response = await axios.get(`${baseURL}/surveys/${id}`);
    return response.data;
  }

  static async saveSurveyData(surveyData) {
    let response = await axios.post(`${baseURL}/data`, surveyData);
    return response.data;
  }
}

export default SurveysAPI;
