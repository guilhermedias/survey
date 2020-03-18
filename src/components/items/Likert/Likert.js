import React from 'react';

class Likert extends React.Component {
  render() {
    return (
      <div>
        <div id = "description">
          { this.props.description }
        </div>

        <div id = "answers">
          <p>Answer 1</p>
          <p>Answer 2</p>
          <p>Answer 3</p>
          <p>Answer 4</p>
          <p>Answer 5</p>
        </div>
      </div>
    );
  }
}

export default Likert;
