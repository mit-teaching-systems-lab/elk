import React from 'react';

class Profile extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var profile_data = this.props.profile_data;
		var role = this.props.role;
	    if (role == "teacher") {
	      return (
	        <div>
	          <h1>Teacher Objective</h1>
	          <p>{profile_data.objective}</p>
	          <h1>Hints</h1>
	          <ul>
	          {
	            profile_data.hints.map(function(hint,i) {
	              return (
	                <li style={{color: 'green'}} key={i} >{hint}</li>
	              );
	            })
	          }
	          </ul>
	        </div>
	      )
	    } else if (role == "student"){
	      return (
	        <div>
	          <h1>Student Profile</h1>
	          <p>{profile_data.profile}</p>
	        </div>
	      )
	    } else {
	    	return null;
	    }
	  }
}

export default Profile;