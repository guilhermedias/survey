import React from 'react';
import Likert from './Likert';
import { shallow } from 'enzyme';

describe('Likert item component', () => {
  it('renders the item description', () => {
    let wrapper = shallow(<Likert description = "Item description." />);

    expect(wrapper.text()).toEqual('Item description.');
  });
});
