import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.displayImages = this.displayImages.bind(this);
  }

  displayImages(images) {
    return images.map(function(image,i) {
      var path = "/GameBundles/Images/" + image + ".png";
      return(
        <div key={i}>
          <p><b>Image {i+1}</b></p>
          <img style={{maxHeight:100}} src={path} />
        </div>
      );
    });
  }

  render() {
    var profileData = this.props.profileData;
    var role = this.props.role;
    var background = profileData ? 
      <div>
        <h2>Background</h2>
        <p>{profileData.background}</p>
      </div> : null;
    if (role == "teacher") {
      return (
        <div style={{flex:1}}>
          {background}
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
          {
            this.displayImages(profileData.images)
          }
        </div>
      );
    } else if (role == "student"){
      var studentProfile = profileData.profiles[this.props.studentID];
      return (
        <div style={{flex:1}}>
          {background}
          <h2>Student Profile</h2>
          <p style={{whiteSpace:'pre-wrap'}}>{studentProfile.profile}</p>
          {
            this.displayImages(studentProfile.images)
          }
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