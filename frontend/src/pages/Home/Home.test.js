import React from 'react';
import Home from './Home';
import Survey from '../../components/Survey/Survey';
import SubmittedMessage from '../../components/SubmittedMessage/SubmittedMessage';
import { shallow } from 'enzyme';

describe('Home page', () => {
  it('renders the survey before the submission', () => {
    let wrapper = shallow(<Home />);

    expect(wrapper).toHaveDisplayName('Survey');
  });

  it('renders the submitted message after the submission', () => {
    let wrapper = shallow(<Home />);

    wrapper.setState({
      submitted: true
    });

    expect(wrapper).toHaveDisplayName('SubmittedMessage');
  });
});
