import React from 'react';
import LikertGroup from './LikertGroup';
import LikertItem from '../LikertItem/LikertItem';
import { shallow } from 'enzyme';

describe('LikertGroup component', () => {
  it('renders the group description', () => {
    let wrapper = shallow(<LikertGroup description = "Likert group description." />);

    expect(wrapper).toIncludeText('Likert group description.');
  });

  it('renders the correct number of Likert items', () => {
    let wrapper = shallow(<LikertGroup description = "Likert group description." />);

    let items = wrapper
      .find(LikertItem);

    expect(items).toHaveLength(2);
  });

  it('renders the Likert items with the correct number of default choices', () => {
    let wrapper = shallow(<LikertGroup description = "Likert group description." />);

    let item = wrapper
      .find(LikertItem)
      .first();

    expect(item).not.toHaveProp('numberOfChoices');
  });

  it('renders the Likert items with the correct number of choices based on property', () => {
    let wrapper = shallow(<LikertGroup description = "Likert group description." numberOfChoices = "7"/>);

    let item = wrapper
      .find(LikertItem)
      .first();

    expect(item).toHaveProp('numberOfChoices', '7');
  });
});
