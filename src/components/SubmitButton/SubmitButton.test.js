import React from 'react';
import SubmitButton from './SubmitButton';
import { shallow } from 'enzyme';

describe('SubmitButton component', () => {
  it('renders the button label', () => {
    let wrapper = shallow(<SubmitButton />);

    expect(wrapper).toIncludeText('Submit');
  });
});
