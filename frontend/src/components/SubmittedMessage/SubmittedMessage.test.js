import React from 'react';
import SubmittedMessage from './SubmittedMessage';
import { shallow } from 'enzyme';

describe('SubmittedMessage component', () => {
  it('renders the message', () => {
    let wrapper = shallow(<SubmittedMessage />);

    expect(wrapper).toIncludeText('Your answer has been submitted.');
  });
});
