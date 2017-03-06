import React from 'react';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.state = {answerChoices:{}, warningOn: false};
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    var answerChoices = this.state.answerChoices;
    if (this.props.questions.length != Object.keys(answerChoices).length) {
      this.setState({warningOn: true});
    } else {
      this.props.submitAnswers(this.state.answerChoices);
    }
  }

  handleOptionChange(i, e) {
    this.setState({warningOn: false});
    var answerChoices = this.state.answerChoices;
    answerChoices[i] = e.target.value;
    this.setState({answerChoices:answerChoices});
  }

  render() {
    return (
      <div>
        <h1>Challenge</h1>
        <h3>Answer the following questions as the student would have answered them</h3>
        <form onSubmit={this.handleFormSubmit}>
        {
          this.props.questions.map((q, i) =>{
            return (
              <div key={i}>
                <p>{q.question}</p>
                <div className="radio">
                    <label>
                      <input onChange={this.handleOptionChange.bind(this,i)} name={i} type="radio" value="true" />
                      True
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input onChange={this.handleOptionChange.bind(this,i)} name={i} type="radio" value="false" />
                      False
                    </label>
                  </div>
              </div>
            );
          })
        }
        <button className="btn btn-default" type="submit">Save</button>
        </form>
      {this.state.warningOn ? <p>Error: Please select an option for each question</p> : null}
      </div>
    );
  }
}

Quiz.propTypes = {
  questions: React.PropTypes.array,
  submitAnswers: React.PropTypes.func.isRequired
};

export default Quiz;

