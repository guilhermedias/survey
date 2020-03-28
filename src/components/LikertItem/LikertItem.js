import React from 'react';
import './LikertItem.css';

class LikertItem extends React.Component {
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

  buildClickHanderForChoiceWith(choiceKey) {
    return () => {
      this.setState({
        selected: choiceKey
      });
    }
  }

  buildChoiceWith(choiceKey) {
      var className ='choice';

      if(choiceKey === this.state.selected) {
        className += ' selected';
      }

      return <div
        key = { choiceKey }
        className = { className }
        onClick = { this.buildClickHanderForChoiceWith(choiceKey) }
      />
  }

  render() {
    let numberOfChoices = parseInt(this.props.numberOfChoices) || 5;

    let choiceKeys = this.buildArrayOfKeysWithSize(numberOfChoices);

    let choices = choiceKeys.map((choiceKey) => this.buildChoiceWith(choiceKey));

    return (
      <div className="likert-item">
        <div className = "statement">
          { this.props.statement }
        </div>

        <div className = "choices">
          { choices }
        </div>
      </div>
    );
  }
}

export default LikertItem;
