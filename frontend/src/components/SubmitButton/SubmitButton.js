import React from 'react';
import './SubmitButton.css';

class SubmitButton extends React.Component {
  render() {
    return (
      <div className = 'submit-button' onClick = { this.props.onClick }>
        Submit
      </div>
    );
  }
}

export default SubmitButton;
