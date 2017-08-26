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
          voteTrack={this.props.voteTrack}
          messageDisplay = {`${this.props.hostName} is deciding on who to send on the quest...`}
          />
        <MissionHistory missionHistory={this.props.history} />

      </div>
      )}
}

export default DiscussMissionPlayersScreen;
