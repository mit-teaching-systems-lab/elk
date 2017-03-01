import React from 'react';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Challenge</h1>
        <h3>Answer the following questions as the student would have answered them</h3>
        {
          this.props.questions.map(function(q, i){
            return (
              <p key={i}>{q.question}</p>
            );
          })
        }
      </div>
    );
  }
}

Quiz.propTypes = {
  questions: React.PropTypes.object
};

export default Quiz;