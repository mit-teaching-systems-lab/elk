import React from 'react';

class Score extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var studentCorrectness = this.props.solutions.map((e, i) => {
      return e == this.props.studentAnswers[i];
    });
    var teacherCorrectness = this.props.studentAnswers.map((e,i) => {
      return e == this.props.teacherAnswers[i];
    });
    var totalScore = studentCorrectness.concat(teacherCorrectness).reduce(function(a,b){
      return b?a+1:a;
    },0);

    var table = this.props.questions.map((q,i) => {
      return(
        <div key={i} style={{display:'flex', flexDirection:'row', border:1}}>
          <div style={{flex:2, border:1}}>
            {q}
          </div>
          <div style={{flex:1, border:1}}>
            {this.props.solutions[i] ? "True": "False"}
          </div>
          <div style={{flex:1, border:1}}>
            {this.props.studentAnswers[i] ? "True" : "False"}
          </div>
          <div style={{flex:1, border:1}}>
            {this.props.teacherAnswers[i] ? "True" : "False"}
          </div>
        </div>
      );
    });
    return (
      <div>
        <div style={{display:'flex', flexDirection:'row', border:1}}>
          <div style={{flex:2, border:1}}>
            <b>Question</b>
          </div>
          <div style={{flex:1, border:1}}>
            <b>"Real" Answers</b>
          </div>
          <div style={{flex:1, border:1}}>
            <b>Student Answer</b>
          </div>
          <div style={{flex:1, border:1}}>
            <b>Teacher Answer</b>
          </div>
        </div>
        {table}
        <b>Total Score: {totalScore}</b>
      </div>
    );
  }
}

Score.propTypes = {
  questions: React.PropTypes.array.isRequired,
  studentAnswers: React.PropTypes.array,
  teacherAnswers: React.PropTypes.array,
  solutions: React.PropTypes.array.isRequired
};

export default Score;

