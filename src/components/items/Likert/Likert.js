import React from 'react';

class Likert extends React.Component {
  render() {
    return (
      <div>
        <div id = "description">
          { this.props.description }
        </div>

        <div id = "answers">
          <input type = "radio" name = "answer" value = "1"/>
          <input type = "radio" name = "answer" value = "2"/>
          <input type = "radio" name = "answer" value = "3"/>
          <input type = "radio" name = "answer" value = "4"/>
          <input type = "radio" name = "answer" value = "5"/>
        </div>
      </div>
    );
  }
}

export default Likert;
