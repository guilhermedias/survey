import React from 'react';
import './LikertItem.css';

class LikertItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0
    };
  }

  buildArrayOfIdsWithSize(arraySize) {
    return Array.from(
      {
        length: arraySize
      },
      (value, index) => index + 1
    );
  }

  buildClickHanderForChoiceWith(choiceId) {
    return () => {
      let itemId = parseInt(this.props.id);

      this.props.selectionHandler(itemId, choiceId);

      this.setState({
        selected: choiceId
      });
    }
  }

  buildChoiceWith(choiceId) {
    var className ='choice';

    let selected = parseInt(this.props.selected) || this.state.selected;

    if(choiceId === selected) {
      className += ' selected';
    }

    return <div
      key = { choiceId }
      className = { className }
      onClick = { this.buildClickHanderForChoiceWith(choiceId) }
    />
  }

  render() {
    let numberOfChoices = parseInt(this.props.numberOfChoices) || 5;

    let choiceIds = this.buildArrayOfIdsWithSize(numberOfChoices);

    let choices = choiceIds.map((choiceId) => this.buildChoiceWith(choiceId));

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
