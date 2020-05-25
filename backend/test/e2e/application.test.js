import axios from 'axios';

describe('The survey application', () => {
  it('gets all surveys', async () => {
    let response = await axios.get('htpp://localhost:3004/surveys');

    expect(response.status).toBe(200);

    let survey = response.data[0];
    expect(survey.surveyId).toBe(1);
    expect(survey.description).toBe('Survey 1.');
    expect(survey.numberOfChoices).toBe(5);
    expect(survey.items).toHaveLength(2);

    let items = survey.items;
    expect(items).toEqual(expect.arrayContaining([
      {
        id: 1,
        statement: 'Statement 1.'
      },
      {
        id: 2,
        statement: 'Statement 2.'
      }
    ]));
  });
});
