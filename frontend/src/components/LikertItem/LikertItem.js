import React from 'react';
import './LikertItem.css';

class LikertItem extends React.Component {
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
    }
  }

  buildChoiceWith(choiceId) {
    var className ='choice';

    let selected = parseInt(this.props.selected) || 0;

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
    let numberOfChoices = parseInt(this.props.numberOfChoices);

    let choiceIds = this.buildArrayOfIdsWithSize(numberOfChoices);

    let choices = choiceIds.map((choiceId) => this.buildChoiceWith(choiceId));

    return (
      <div className='likert-item'>
        <div className = 'statement'>
          { this.props.statement }
        </div>

        <div className = 'choices'>
          { choices }
        </div>
      </div>
    );
  }
}

export default LikertItem;
