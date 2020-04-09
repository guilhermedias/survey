import axios from 'axios';
import baseURL from '../baseURL';

const SurveysAPI = {
  getSurveyByID: async (id) => {
    let response = await axios.get(`${baseURL}/surveys/${id}`);

    return response.data;
  },

  saveSurveyData: async (surveyData) => {
    let response = await axios.post(`${baseURL}/data`, surveyData);

    return response.data;
  }
}

export default SurveysAPI;
