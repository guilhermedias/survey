import React from 'react';
import LikertItem from './LikertItem';
import { shallow } from 'enzyme';

describe('LikertItem component', () => {
  it('renders the item statement', () => {
    let wrapper = shallow(<LikertItem id = '1' statement = 'Item statement.' selectionHandler = { jest.fn() } numberOfChoices = '5' />);

    expect(wrapper).toIncludeText('Item statement.');
  });

  it('renders the correct number of choices based on property', () => {
    let wrapper = shallow(<LikertItem id = '1' statement = 'Item statement.' selectionHandler = { jest.fn() } numberOfChoices = '7' />);

    let choices = wrapper
      .find('.choices')
      .children();

    expect(choices).toHaveLength(7);
  });

  it('assigns correct integer key to the choices', () => {
    let wrapper = shallow(<LikertItem id = '1' statement = 'Item statement.' selectionHandler = { jest.fn() } numberOfChoices = '5' />);

    let choices = wrapper
      .find('.choices');

    expect(choices.childAt(0).key()).toEqual('1');
    expect(choices.childAt(1).key()).toEqual('2');
    expect(choices.childAt(2).key()).toEqual('3');
    expect(choices.childAt(3).key()).toEqual('4');
    expect(choices.childAt(4).key()).toEqual('5');
  });

  it('renders the selected choice', () => {
    let wrapper = shallow(<LikertItem id = '1' statement = 'Item statement.' selectionHandler = { jest.fn() } selected = '3' numberOfChoices = '5' />);

    let middleChoice = wrapper
      .find('.choices')
      .childAt(2);

    expect(middleChoice).toHaveClassName('selected');
  });

  it('invokes the selection handler', () => {
    let handler = jest.fn();
    let wrapper = shallow(<LikertItem id = '1' statement = 'Item statement.' selectionHandler = { handler } numberOfChoices = '5' />);

    let middleChoice = wrapper
      .find('.choices')
      .childAt(2);

    middleChoice.simulate('click');

    expect(handler).toHaveBeenCalledWith(1, 3);
  });
});
