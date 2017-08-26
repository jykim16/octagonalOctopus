import React from 'react';

import InfoPanel from './InfoPanel.jsx';
import MissionHistory from './MissionHistory.jsx';
import GameBoard from './GameBoard/GameBoard.jsx';

class DiscussMissionPlayersScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="discussMissionPlayersScreen">

        <InfoPanel role={this.props.role} extraInfo = {this.props.extraInfo}/>
        <GameBoard
          history = {this.props.questHistory}
          numPeopleOnMissions = {this.props.numPeopleOnMissions}
          currentMission = {this.props.questHistory.length}
          voteTrack='{"0": [false, false, true], "1": [false, true], "2": [true], "3": [], "4": []}'
          />
        <MissionHistory missionHistory={this.props.history} />

        <h3> Discuss Which {this.props.missionSize} Players to Send on the Mission </h3>


      </div>
      )}
}

export default DiscussMissionPlayersScreen;
