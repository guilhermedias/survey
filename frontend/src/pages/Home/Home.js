import React from 'react';
import Survey from '../../components/Survey/Survey';
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
      : <Survey onSubmit = {this.submissionHandler.bind(this)} />
    );
  }
}

export default Home;
