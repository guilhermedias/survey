import axios from 'axios';
import baseURL from '../baseURL';

const SurveysAPI = {
  getSurveyByID: async (id) => {
    let response = await axios.get(`${baseURL}/surveys/${id}`);

    return response;
  }
}

export default SurveysAPI;
