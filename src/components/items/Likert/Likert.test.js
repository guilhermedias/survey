import React from 'react';
import Likert from './Likert';
import { shallow } from 'enzyme';

describe('Likert item component', () => {
  it('renders the item description', () => {
    let wrapper = shallow(<Likert description = "Item description." />);

    expect(wrapper).toIncludeText('Item description.');
  });

  it('renders the correct number of answers based on property', () => {
    let wrapper = shallow(<Likert description = "Item description." numberOfAnswers = "7" />);

    let answers = wrapper
      .find('.answers')
      .children();

    expect(answers).toHaveLength(7);
  });

  it('renders the correct number of default answers', () => {
    let wrapper = shallow(<Likert description = "Item description." />);

    let answers = wrapper
      .find('.answers')
      .children();

    expect(answers).toHaveLength(5);
  });


  it('assigns correct integer key to the answers', () => {
    let wrapper = shallow(<Likert description = "Item description." />);

    let answers = wrapper
      .find('.answers');

    expect(answers.childAt(0).key()).toEqual("1");
    expect(answers.childAt(1).key()).toEqual("2");
    expect(answers.childAt(2).key()).toEqual("3");
    expect(answers.childAt(3).key()).toEqual("4");
    expect(answers.childAt(4).key()).toEqual("5");
  });

  it('selects the clicked answer', () => {
    let wrapper = shallow(<Likert description = "Item description." />);

    let middleAnswer = wrapper
      .find('.answers')
      .childAt(2);

    middleAnswer.simulate('click');

    expect(wrapper.state('selected')).toEqual(3);
  });
});
