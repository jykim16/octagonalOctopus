import React from 'react';

import InfoPanel from './InfoPanel.jsx';
import Timer from './Timer.jsx';
import GameBoard from './GameBoard/GameBoard.jsx';

class AwaitAssassinScreen extends React.Component {

  constructor(props) {
    super(props);

    this.spyCount = 3; // Needs to be passed down appropriately
  }

  render() {

    return (
      <div id="awaitAssassinScreen">
        <GameBoard
          history = {this.props.questHistory}
          numPeopleOnMissions = {this.props.numPeopleOnMissions}
          currentMission = {this.props.questHistory.length}
          voteTrack='{"0": [false, false, true], "1": [false, true], "2": [true], "3": [], "4": []}'
          />
        <h3> Awaiting Mordred </h3>

        <InfoPanel role={this.props.role} missionHistory={this.props.history} />



      </div>
    )}
}

export default AwaitAssassinScreen;
