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
        <div>
          <h1>Teacher Objective</h1>
          <p>{profileData.objective}</p>
          <h1>Hints</h1>
          <ul>
          {
            profileData.hints.map(function(hint,i) {
              return (
                <li style={{color: 'green'}} key={i} >{hint}</li>
              );
            })
          }
          </ul>
        </div>
      );
    } else if (role == "student"){
      return (
        <div>
          <h1>Student Profile</h1>
          <p>{profileData.profile}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}

Profile.propTypes = {
  profileData: React.PropTypes.object,
  role: React.PropTypes.string
};

export default Profile;