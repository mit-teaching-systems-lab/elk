import React from 'react';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFormSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Challenge</h1>
        <h3>Answer the following questions as the student would have answered them</h3>
        <form onSubmit={this.handleFormSubmit}>
        {
          this.props.questions.map(function(q, i){
            // console.log(q);
            return (
              <div key={i}>
                <p>{q.question}</p>
                <div className="radio">
                    <label>
                      <input name={i} type="radio" value="true" />
                      True
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input name={i} type="radio" value="false" />
                      False
                    </label>
                  </div>
              </div>
            );
          })
        }
        <button className="btn btn-default" type="submit">Save</button>
        </form>
      </div>
    );
  }
}

Quiz.propTypes = {
  questions: React.PropTypes.array
};

export default Quiz;

