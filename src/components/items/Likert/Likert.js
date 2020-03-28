import React from 'react';
import './Likert.css';

class Likert extends React.Component {
  render() {
    let numberOfAnswers = parseInt(this.props.numberOfAnswers) || 5;

    let answerValues = Array.from(
      {
        length: numberOfAnswers
      },
      (value, key) => key + 1
    );


    let answers = answerValues.map((numericAnswerValue) => {
      let answerValue = numericAnswerValue.toString();

      return <input
        type = "radio"
        name = "answer"
        className = "answer"
        value = { answerValue }
        key = { answerValue }
      />
    });

    return (
      <div className="likert-item">
        <div id = "description" className = "description">
          { this.props.description }
        </div>

        <div id = "answers" className = "answers">
          { answers }
        </div>
      </div>
    );
  }
}

export default Likert;
