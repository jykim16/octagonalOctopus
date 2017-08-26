import React from 'react';

class InfoPanel extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {
    var split = this.props.role.split('_')
    var name = split[0];
    var role = split[0].split(' ').join('').toLowerCase();
    var styles = {
      content: `url(/styles/Resources/${role}.png)`
    }

    if (!this.props.extraInfo) {
      var extraInfo = ''
    } else {
      console.log('extra Info: ', this.props.extraInfo);
      var usernames = this.props.extraInfo.slice(1, this.props.extraInfo.length);

      var extraInfo = this.props.extraInfo[0] + usernames.join(', ');
      //console.log('usernames: ', usernames);
    }

    return (
    <div id="infoPanel">
      <h5> {name} </h5>
      <div className="photos" style={styles}></div>
      <p> {extraInfo} </p>
    </div>
    )}
}

export default InfoPanel;
