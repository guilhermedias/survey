import React from 'react';

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

      return <input type = "radio" name = "answer" value = { answerValue } key = { answerValue }/>
    });

    return (
      <div>
        <div id = "description">
          { this.props.description }
        </div>

        <div id = "answers">
          { answers }
        </div>
      </div>
    );
  }
}

export default Likert;
