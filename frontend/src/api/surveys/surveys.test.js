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

  it('saves answer in backend', async () => {
    let answer = {
      surveyId: 1,
      items: [
        {
          id: 1,
          selected: 4
        },
        {
          id: 2,
          selected: 2
        },
      ]
    };

    axios.post.mockResolvedValue({
      data: {
        answerId: 1
      }
    });

    let response = await SurveysAPI.saveAnswer(answer);

    expect(axios.post).toHaveBeenCalledWith('base.url.com/answers', answer);
    expect(response.answerId).toEqual(1);
  });
});
