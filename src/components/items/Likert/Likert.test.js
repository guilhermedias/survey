import React from 'react';
import Likert from './Likert';
import { shallow } from 'enzyme';

describe('Likert item component', () => {
  it('renders the item description', () => {
    let wrapper = shallow(<Likert description = "Item description." />);

    expect(wrapper).toIncludeText('Item description.');
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

    expect(answer).toHaveDisplayName('input');
    expect(answer).toHaveProp('type', 'radio');
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

  it('assigns correct integer values to the answers', () => {
    let wrapper = shallow(<Likert description = "Item description." />);

    let answers = wrapper
      .find('#answers');

    expect(answers.childAt(0).prop('value')).toEqual("1");
    expect(answers.childAt(1).prop('value')).toEqual("2");
    expect(answers.childAt(2).prop('value')).toEqual("3");
    expect(answers.childAt(3).prop('value')).toEqual("4");
    expect(answers.childAt(4).prop('value')).toEqual("5");
  });
});
