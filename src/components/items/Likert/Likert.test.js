import React from 'react';
import Likert from './Likert';
import { shallow } from 'enzyme';

describe('Likert item component', () => {
  it('renders the item description', () => {
    let wrapper = shallow(<Likert description = "Item description." />);

    let description = wrapper
      .find('#description')
      .text()

    expect(description).toEqual('Item description.');
  });

  it('renders the correct default number of answers', () => {
    let wrapper = shallow(<Likert description = "Item description." />);

    let answers = wrapper
      .find('#answers')
      .children();

    expect(answers).toHaveLength(5);
  });

  it('renders the answers as radio buttons', () => {
    let wrapper = shallow(<Likert description = "Item description." />);

    let answer = wrapper
      .find('#answers')
      .children()
      .first();

    expect(answer.type()).toEqual('input');
    expect(answer.prop('type')).toEqual('radio');
  });

  it('renders all answers as part of the same group', () => {
    let wrapper = shallow(<Likert description = "Item description." />);

    let answers = wrapper
      .find('#answers')
      .children();

    let answersInSameGroup = answers.filterWhere((answer) => {
      return answer.prop('name') === 'answer';
    });

    expect(answersInSameGroup).toHaveLength(5);
  });
});
