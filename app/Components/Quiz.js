import React from 'react';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.onHandleOptionChange = this.onHandleOptionChange.bind(this);
    this.state = {answerChoices:{}, warningOn: false, submitted: false};
    this.onHandleFormSubmit = this.onHandleFormSubmit.bind(this);
  }

  onHandleFormSubmit(e) {
    e.preventDefault();
    var answerChoices = this.state.answerChoices;
    if (this.props.questions.length != Object.keys(answerChoices).length) {
      this.setState({warningOn: true});
    } else {
      this.setState({submitted: true});
      this.props.submitAnswers(answerChoices);
    }
  }

  onHandleOptionChange(i, e) {
    this.setState({warningOn: false});
    var answerChoices = this.state.answerChoices;
    answerChoices[i] = (e.target.value == "true");
    this.setState({answerChoices:answerChoices});
  }

  render() {
    var disabledInput = this.props.observer || this.state.submitted;
    var submitMessage = (
      <div>
        <p> Your answers have been submitted.</p>
        <p> Please wait while the other player submits their guesses </p>
      </div>
      );
    
    return (
      <div>
        <h2>Challenge</h2>
        <h3>Answer the following questions as the student would have answered them</h3>
        <form onSubmit={this.onHandleFormSubmit}>
        {
          this.props.questions.map((q, i) =>{
            return (
              <div key={i}>
                <p>{q}</p>
                <div className="radio">
                    <label>
                      <input disabled={disabledInput} onChange={this.onHandleOptionChange.bind(this,i)} name={i} type="radio" value={true} />
                      True
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input disabled={disabledInput} onChange={this.onHandleOptionChange.bind(this,i)} name={i} type="radio" value={false} />
                      False
                    </label>
                  </div>
              </div>
            );
          })
        }
        <button disabled={disabledInput} className="btn btn-default" type="submit">Save</button>
        </form>
      {this.props.observer ? <p><b> Players are submitting their guesses</b></p> : null}
      {this.state.warningOn ? <p>Error: Please select an option for each question</p> : null}
      {this.state.submitted ? submitMessage : null}
      </div>
    );
  }
}

Quiz.propTypes = {
  questions: React.PropTypes.array.isRequired,
  submitAnswers: React.PropTypes.func.isRequired,
  observer: React.PropTypes.bool
};

export default Quiz;

