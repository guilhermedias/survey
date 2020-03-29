import axios from 'axios';
import SurveysAPI from './surveys';

jest.mock('axios');
jest.mock('../baseURL', () => 'base.url.com');

describe('Surveys API', () => {
  it('retrieves the survey by ID', async () => {
    axios.get.mockResolvedValue({
      data: {
        id: 1
      }
    });

    let survey = await SurveysAPI.getSurveyByID(1);

    expect(axios.get).toHaveBeenCalledWith('base.url.com/surveys/1');
    expect(survey.id).toEqual(1);
  });
});
