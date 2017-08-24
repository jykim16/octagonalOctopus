import React from 'react';

class InfoPanel extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {

    var role = this.props.role.split(' ').join('');
    console.log(role);
    var styles = {
      content: `url(/styles/Resources/${role}.png)`
    }
    console.log(styles);
    if (!this.props.extraInfo) {
        var extraInfo = ''
      } else {
        var usernames = this.props.extraInfo.slice(1, this.props.extraInfo.length);
        var extraInfo = this.props.extraInfo[0] + usernames.join(', ');
      }
      return (
      <div id="infoPanel">
        <h5> Info Panel </h5>
        <div className="photos" style={styles}></div>
        <p> {extraInfo} </p>
      </div>
      )}
}

export default InfoPanel;
