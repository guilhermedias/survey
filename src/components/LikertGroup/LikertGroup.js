import React from 'react';
import LikertItem from '../LikertItem/LikertItem';
import SurveysAPI from '../../api/surveys/surveys';
import './LikertGroup.css';

class LikertGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  selectionHandler(itemId, choiceId) {
    let newItems = this.state.items.map((item) => {
      let newItem = {
        id: item.id,
        statement: item.statement
      };

      if(item.id === itemId) {
        newItem.selected = choiceId;
      }

      return newItem;
    });

    this.setState({
      items: newItems
    });
  }

  async componentDidMount() {
    let survey = await SurveysAPI.getSurveyByID(1);

    this.setState({
      items: survey.items
    });
  }

  render() {
    let items = this.state.items.map((item) => {
      let optionalProps = {};

      if(this.props.numberOfChoices) {
        optionalProps.numberOfChoices = this.props.numberOfChoices;
      }

      return <LikertItem
        id = { item.id }
        key = { item.id }
        statement = { item.statement }
        selectionHandler = { this.selectionHandler.bind(this) }
        { ...optionalProps }
      />
    });

    return (
      <div className = "likert-group">
        <div className = "likert-group-description">
          { this.props.description }
        </div>

        { items }
      </div>
    );
  }
}

export default LikertGroup;
