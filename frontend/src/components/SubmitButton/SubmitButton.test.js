import React from 'react';
import SubmitButton from './SubmitButton';
import { shallow } from 'enzyme';

describe('SubmitButton component', () => {
  it('renders the button label', () => {
    let wrapper = shallow(<SubmitButton />);

    expect(wrapper).toIncludeText('Submit');
  });

  it('calls the click handler', () => {
    let handler = jest.fn();
    let wrapper = shallow(<SubmitButton onClick = { handler }/>);

    wrapper.simulate('click');

    expect(handler).toHaveBeenCalled();
  });
});
