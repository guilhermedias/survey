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

  async componentDidMount() {
    let response = await SurveysAPI.getSurveyByID(1);

    this.setState({
      items: response.data.items
    });
  }

  render() {
    let items = this.state.items.map((item) => {
      let optionalProps = {};

      if(this.props.numberOfChoices) {
        optionalProps.numberOfChoices = this.props.numberOfChoices;
      }

      return <LikertItem
        key = { item.id }
        statement = { item.statement }
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