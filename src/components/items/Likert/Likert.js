import React from 'react';
import './Likert.css';

class Likert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0
    };
  }

  buildArrayOfKeysWithSize(arraySize) {
    return Array.from(
      {
        length: arraySize
      },
      (value, index) => index + 1
    );
  }

  buildClickHanderForAnswerWith(answerKey) {
    return () => {
      this.setState({
        selected: answerKey
      });
    }
  }

  buildAnswerWith(answerKey) {
      var className ='answer';

      if(answerKey === this.state.selected) {
        className += ' selected';
      }

      return <div
        key = { answerKey }
        className = { className }
        onClick = { this.buildClickHanderForAnswerWith(answerKey) }
      />
  }

  render() {
    let numberOfAnswers = parseInt(this.props.numberOfAnswers) || 5;

    let answerKeys = this.buildArrayOfKeysWithSize(numberOfAnswers);

    let answers = answerKeys.map((answerKey) => {
      return this.buildAnswerWith(answerKey);
    });

    return (
      <div className="likert-item">
        <div className = "description">
          { this.props.description }
        </div>

        <div className = "answers">
          { answers }
        </div>
      </div>
    );
  }
}

export default Likert;
