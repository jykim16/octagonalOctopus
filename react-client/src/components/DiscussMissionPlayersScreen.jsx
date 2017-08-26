import React from 'react';

import InfoPanel from './InfoPanel.jsx';
import MissionHistory from './MissionHistory.jsx';

class DiscussMissionPlayersScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="discussMissionPlayersScreen">

        <InfoPanel role={this.props.role} extraInfo = {this.props.extraInfo}/>

        <MissionHistory missionHistory={this.props.history} />

        <h3> Discuss Which {this.props.missionSize} Players to Send on the Mission </h3>


      </div>
      )}
}

export default DiscussMissionPlayersScreen;
