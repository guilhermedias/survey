import React from 'react';

class Likert extends React.Component {
  render() {
    return (
      <div>
        <div id = "description">
          { this.props.description }
        </div>

        <div id = "answers">
          <input type = "radio" name = "answer" />
          <input type = "radio" name = "answer" />
          <input type = "radio" name = "answer" />
          <input type = "radio" name = "answer" />
          <input type = "radio" name = "answer" />
        </div>
      </div>
    );
  }
}

export default Likert;
