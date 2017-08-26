import React from 'react';
import Cards from './Cards.jsx';

class InfoPanel extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {
    var split = this.props.role.split('_');
    var name = split[0];
    var role = split[0].split(' ').join('').toLowerCase();
    var extraInfo;

    var styles = {
      content: `url(/styles/Resources/${role}.png)`
    }

    if (this.props.extraInfo){
      extraInfo = (<Cards extraInfo={this.props.extraInfo}/>);
    }
    // else {
    //   extraInfo = ();
    // }

    // if (!this.props.extraInfo) {
    //   var extraInfo = ''
    // } else {

    //   var usernames = this.props.extraInfo.slice(1, this.props.extraInfo.length);
    //   var extraInfo = this.props.extraInfo[0] + usernames.join(', ');
    // }

    return (
      <div id="infoPanel">
        <div className="photos" style={styles}></div>
        <div className="name"> You Are {name} </div>
        {extraInfo}
      </div>
    )
  }
}

export default InfoPanel;
