import React from 'react';
import LikertGroup from '../../components/LikertGroup/LikertGroup';
import SubmittedMessage from '../../components/SubmittedMessage/SubmittedMessage';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false
    };
  }

  submissionHandler() {
    this.setState({
      submitted: true
    });
  }

  render() {
    return (
      this.state.submitted
      ? <SubmittedMessage />
      : <LikertGroup onSubmit = {this.submissionHandler.bind(this)} />
    );
  }
}

export default Home;
