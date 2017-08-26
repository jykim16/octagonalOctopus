import React from 'react';

import InfoPanel from './InfoPanel.jsx';
import Timer from './Timer.jsx';
import GameBoard from './GameBoard/GameBoard.jsx';

class MissionOutcomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.nextPage = this.nextPage.bind(this);
    }

  render() {

    return (
      <div id="missionOutcome">
        <GameBoard
          history = {this.props.questHistory}
          numPeopleOnMissions = {this.props.numPeopleOnMissions}
          currentMission = {this.props.questHistory.length}
          voteTrack='{"0": [false, false, true], "1": [false, true], "2": [true], "3": [], "4": []}'
          />
        <h4> Mission Outcome  </h4>

        <InfoPanel role={this.props.role} missionHistory={this.props.history}  extraInfo = {this.props.extraInfo}/>

        <p>
        Fail votes: {this.props.failVotes}
        </p>

        <p>
        Success votes: {this.props.successVotes}
        </p>

        <button onClick={this.nextPage}>
        Next Mission!
        </button>

      </div>
      )}

  nextPage() {
    if (this.props.host) {
      this.props.nextPage('EnterMissionPlayersScreen')
    } else {
      this.props.nextPage('DiscussMissionPlayersScreen')
    }
  }
}

export default MissionOutcomeScreen;
