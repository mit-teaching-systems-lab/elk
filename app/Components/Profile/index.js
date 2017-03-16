import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var profileData = this.props.profileData;
    var role = this.props.role;
    if (role == "teacher") {
      return (
        <div style={{flex:1}}>
          <h2>Background</h2>
          <p>{profileData.background}</p>
          <h2>Teacher Objective</h2>
          <p>{profileData.objective}</p>
          <h2>Hints</h2>
          <ul>
          {
            profileData.hints.map(function(hint,i) {
              return (
                <li key={i} >{hint}</li>
              );
            })
          }
          </ul>
        </div>
      );
    } else if (role == "student"){
      return (
        <div style={{flex:1}}>
          <h2>Background</h2>
          <p>{profileData.background}</p>
          <h2>Student Profile</h2>
          <p style={{whiteSpace:'pre-wrap'}}>{profileData.profiles[this.props.studentID].profile}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}

Profile.propTypes = {
  profileData: React.PropTypes.object,
  role: React.PropTypes.string.isRequired,
  studentID: React.PropTypes.number.isRequired
};

export default Profile;