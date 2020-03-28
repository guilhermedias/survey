import React from 'react';
import LikertItem from '../LikertItem/LikertItem';

class LikertGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          id: 1,
          statement: "Likert item statement 1."
        },
        {
          id: 2,
          statement: "Likert item statement 2."
        }
      ]
    };
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
      <div>
        { this.props.description }
        { items }
      </div>
    );
  }
}

export default LikertGroup;
