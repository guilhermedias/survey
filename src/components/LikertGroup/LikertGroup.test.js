import React from 'react';
import LikertGroup from './LikertGroup';
import LikertItem from '../LikertItem/LikertItem';
import SubmitButton from '../SubmitButton/SubmitButton';
import SurveysAPI from '../../api/surveys/surveys';
import { shallow } from 'enzyme';

jest.mock('../../api/surveys/surveys');

const flushPromises = () =>
  new Promise(resolve => setImmediate(resolve));

describe('LikertGroup component', () => {
  beforeAll(() => {
    SurveysAPI.getSurveyByID.mockResolvedValue({
      id: 1,
      items: [
        {
          id: 1,
          statement: "Likert item statement 1."
        },
        {
          id: 2,
          statement: "Likert item statement 2."
        }
      ]
    });
  });

  it('renders the group description', () => {
    let wrapper = shallow(<LikertGroup description = "Likert group description." />);

    expect(wrapper).toIncludeText('Likert group description.');
  });

  it('renders the submit button', () => {
    let wrapper = shallow(<LikertGroup description = "Likert group description." />);

    let submitButtonExists = wrapper.exists(SubmitButton);

    expect(submitButtonExists).toBe(true);
  });

  it('renders the correct number of Likert items', async () => {
    let wrapper = shallow(<LikertGroup description = "Likert group description." />);
    await flushPromises();

    let items = wrapper
      .find(LikertItem);

    expect(items).toHaveLength(2);
  });

  it('renders the Likert items with the correct number of default choices', async () => {
    let wrapper = shallow(<LikertGroup description = "Likert group description." />);
    await flushPromises();

    let item = wrapper
      .find(LikertItem)
      .first();

    expect(item).not.toHaveProp('numberOfChoices');
  });

  it('renders the Likert items with the correct number of choices based on property', async () => {
    let wrapper = shallow(<LikertGroup description = "Likert group description." numberOfChoices = "7"/>);
    await flushPromises();

    let item = wrapper
      .find(LikertItem)
      .first();

    expect(item).toHaveProp('numberOfChoices', '7');
  });

  it('updates its state when a choice is selected', async () => {
    SurveysAPI.getSurveyByID.mockResolvedValue({
      id: 1,
      items: [
        {
          id: 1,
          statement: "Likert item statement 1."
        }
      ]
    });

    let wrapper = shallow(<LikertGroup description = "Likert group description." />);
    await flushPromises();

    wrapper.instance().selectionHandler(1, 3);

    let selected = wrapper.state().items[0].selected;
    expect(selected).toBe(3);
  });

  it('saves survey data when the submit button is clicked', async () => {
    let wrapper = shallow(<LikertGroup description = "Likert group description." />);
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

    expect(SurveysAPI.saveSurveyData).toHaveBeenCalledWith({
      id: 1,
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
});
