import React from 'react';

import InfoPanel from './InfoPanel.jsx';
import Timer from './Timer.jsx';
import GameBoard from './GameBoard/GameBoard.jsx';

class AwaitMissionOutcomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id="awaitMissionOutcomeScreen">
        <InfoPanel role={this.props.role} missionHistory={this.props.history} />
        <GameBoard
          history = {this.props.questHistory}
          numPeopleOnMissions = {this.props.numPeopleOnMissions}
          currentMission = {this.props.questHistory.length}
          voteTrack={this.props.voteTrack}
          messageDisplay = {`Awaiting Mission Outcome...`}
          />
        <p></p>



      </div>
    )}
}

export default AwaitMissionOutcomeScreen;
