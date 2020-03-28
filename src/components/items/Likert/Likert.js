import React from 'react';
import './Likert.css';

class Likert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0
    };
  }

  render() {
    let numberOfAnswers = parseInt(this.props.numberOfAnswers) || 5;

    let answerKeys = Array.from(
      {
        length: numberOfAnswers
      },
      (value, key) => key + 1
    );


    let answers = answerKeys.map((answerKey) => {
      return <div key = { answerKey } className = "answer" onClick = {
        () => {
          this.setState({
            selected: answerKey
          });
        }}
      />
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
