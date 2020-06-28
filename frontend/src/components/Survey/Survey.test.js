import React from 'react';
import Survey from './Survey';
import LikertItem from '../LikertItem/LikertItem';
import SubmitButton from '../SubmitButton/SubmitButton';
import SurveysAPI from '../../api/surveys/surveys';
import { shallow } from 'enzyme';

jest.mock('../../api/surveys/surveys');

const flushPromises = () =>
  new Promise(resolve => setImmediate(resolve));

describe('Survey component', () => {
  beforeAll(() => {
    SurveysAPI.getSurveyByID.mockResolvedValue({
      surveyId: 1,
      description: 'Likert group description.',
      numberOfChoices: 5,
      items: [
        {
          id: 1,
          statement: 'Likert item statement 1.'
        },
        {
          id: 2,
          statement: 'Likert item statement 2.'
        }
      ]
    });

    SurveysAPI.saveAnswer.mockResolvedValue({
      answerId: 1
    });
  });

  it('renders the group description', async () => {
    let wrapper = shallow(<Survey onSubmit = { () => {} }/>);
    await flushPromises();

    expect(wrapper).toIncludeText('Likert group description.');
  });

  it('renders the submit button', async () => {
    let wrapper = shallow(<Survey onSubmit = { () => {} }/>);
    await flushPromises();

    let submitButtonExists = wrapper.exists(SubmitButton);

    expect(submitButtonExists).toBe(true);
  });

  it('renders the correct number of Likert items', async () => {
    let wrapper = shallow(<Survey onSubmit = { () => {} }/>);
    await flushPromises();

    let items = wrapper
      .find(LikertItem);

    expect(items).toHaveLength(2);
  });

  it('renders the Likert items with the correct number of choices', async () => {
    let wrapper = shallow(<Survey onSubmit = { () => {} }/>);
    await flushPromises();

    let item = wrapper
      .find(LikertItem)
      .first();

    expect(item).toHaveProp('numberOfChoices', 5);
  });

  it('updates its state when a choice is selected', async () => {
    SurveysAPI.getSurveyByID.mockResolvedValue({
      surveyId: 1,
      items: [
        {
          id: 1,
          statement: 'Likert item statement 1.'
        }
      ]
    });

    let wrapper = shallow(<Survey onSubmit = { () => {} }/>);
    await flushPromises();

    wrapper.instance().selectionHandler(1, 3);

    let selected = wrapper.state().items[0].selected;
    expect(selected).toBe(3);
  });

  it('saves answer when the submit button is clicked', async () => {
    let wrapper = shallow(<Survey onSubmit = { () => {} }/>);
    await flushPromises();

    wrapper.setState({
      items: [
        {
          id: 1,
          statement: 'Likert item statement 1.',
          selected: 4
        },
        {
          id: 2,
          statement: 'Likert item statement 2.',
          selected: 2
        }
      ]
    });

    wrapper
      .find(SubmitButton)
      .simulate('click');

    expect(SurveysAPI.saveAnswer).toHaveBeenCalledWith({
      surveyId: 1,
      items: [
        {
          id: 1,
          selected: 4
        },
        {
          id: 2,
          selected: 2
        }
      ]
    });
  });

  it('calls the home page submission handler when the submit button is clicked', async () => {
    let handler = jest.fn();
    let wrapper = shallow(<Survey onSubmit = { handler }/>);
    await flushPromises();

    wrapper
      .find(SubmitButton)
      .simulate('click');

    await flushPromises();

    expect(handler).toHaveBeenCalled();
  });
});
