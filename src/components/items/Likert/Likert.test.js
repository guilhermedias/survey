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
});
