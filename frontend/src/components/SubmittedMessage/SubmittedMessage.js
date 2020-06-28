import React from 'react';
import './SubmittedMessage.css';

class SubmittedMessage extends React.Component {
  render() {
    return (
      <div className= 'submitted-message'>
        <div className = 'submitted-message-header'>
          Thank you!
        </div>
        <div className = 'submitted-message-text'>
          Your answer has been submitted.
        </div>
      </div>
    );
  }
}

export default SubmittedMessage;
