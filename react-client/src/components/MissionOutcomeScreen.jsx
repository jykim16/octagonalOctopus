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
        <InfoPanel role={this.props.role} missionHistory={this.props.history}  extraInfo = {this.props.extraInfo}/>
        <GameBoard
          history = {this.props.questHistory}
          numPeopleOnMissions = {this.props.numPeopleOnMissions}
          currentMission = {this.props.questHistory.length}
          voteTrack={this.props.voteTrack}
          messageDisplay = {`Mission Outcome:\n
            Fail votes: ${this.props.failVotes}\n
            Success votes: ${this.props.successVotes}`}
          />

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
