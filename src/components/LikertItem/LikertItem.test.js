import React from 'react';
import LikertItem from './LikertItem';
import { shallow } from 'enzyme';

describe('LikertItem component', () => {
  it('renders the item statement', () => {
    let wrapper = shallow(<LikertItem statement = "Item statement." />);

    expect(wrapper).toIncludeText('Item statement.');
  });

  it('renders the correct number of choices based on property', () => {
    let wrapper = shallow(<LikertItem statement = "Item statement." numberOfChoices = "7" />);

    let choices = wrapper
      .find('.choices')
      .children();

    expect(choices).toHaveLength(7);
  });

  it('renders the correct number of default choices', () => {
    let wrapper = shallow(<LikertItem statement = "Item statement." />);

    let choices = wrapper
      .find('.choices')
      .children();

    expect(choices).toHaveLength(5);
  });


  it('assigns correct integer key to the choices', () => {
    let wrapper = shallow(<LikertItem statement = "Item statement." />);

    let choices = wrapper
      .find('.choices');

    expect(choices.childAt(0).key()).toEqual('1');
    expect(choices.childAt(1).key()).toEqual('2');
    expect(choices.childAt(2).key()).toEqual('3');
    expect(choices.childAt(3).key()).toEqual('4');
    expect(choices.childAt(4).key()).toEqual('5');
  });

  it('selects the clicked choice', () => {
    let wrapper = shallow(<LikertItem statement = "Item statement." />);

    let middleChoice = wrapper
      .find('.choices')
      .childAt(2);

    middleChoice.simulate('click');

    expect(wrapper.state('selected')).toEqual(3);
  });
});
