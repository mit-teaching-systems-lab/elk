import React from 'react';

class Score extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var studentCorrectness = this.props.questions.map((e, i) => {
      return e.answer == this.props.studentAnswers[i];
    });
    var teacherCorrectness = this.props.studentAnswers.map((e,i) => {
      return e == this.props.teacherAnswers[i];
    });
    var totalScore = studentCorrectness.concat(teacherCorrectness).reduce(function(a,b){
      return b?a+1:a;
    },0);
    var style = {flex:1, border:1, borderStyle:"solid", padding:4};
    var table = this.props.questions.map((q,i) => {
      var path = "/GameBundles/Images/" + q.image + ".png";
      return(
        <div key={i} style={{display:'flex', flexDirection:'row', border:1}}>
          <div style={{flex:2, border:1, borderStyle:"solid", padding:4}}>
            {q.question}
            {q.image.length > 0 ? <img style={{maxHeight:"100%", maxWidth:"100%"}} src={path} /> : null}
          </div>
          <div style={style}>
            {q.answer ? "True": "False"}
          </div>
          <div style={style}>
            {this.props.studentAnswers[i] ? "True" : "False"}
          </div>
          <div style={style}>
            {this.props.teacherAnswers[i] ? "True" : "False"}
          </div>
        </div>
      );
    });
    return (
      <div>
        <div style={{display:'flex', flexDirection:'row', border:1, marginTop: 10}}>
          <div style={{flex:2, border:1, borderStyle:"solid", padding:4}}>
            <b>Question</b>
          </div>
          <div style={style}>
            <b>"Real" Answers</b>
          </div>
          <div style={style}>
            <b>Student Answer</b>
          </div>
          <div style={style}>
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
  teacherAnswers: React.PropTypes.array
};

export default Score;

