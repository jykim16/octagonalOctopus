import React from 'react';

import InfoPanel from './InfoPanel.jsx';
import Timer from './Timer.jsx';
import GameBoard from './GameBoard/GameBoard.jsx';

class MissionVoteScreen extends React.Component {

  constructor(props) {
    super(props);
    this.fail = this.fail.bind(this);
    this.succeed = this.succeed.bind(this);
  }

  fail(){
    this.props.socket.emit('missionvote', {roomname:this.props.roomname, vote: false });
    this.props.waiting();
  }
  succeed() {
    this.props.socket.emit('missionvote', {roomname:this.props.roomname, vote: true });
    this.props.waiting();
  }

  render() {

    return (
      <div id="missionVoteScreen">

        <h3> Mission Vote </h3>

        <InfoPanel role={this.props.role} missionHistory={this.props.history}  extraInfo = {this.props.extraInfo}/>
        <GameBoard
          history = {this.props.questHistory}
          numPeopleOnMissions = {this.props.numPeopleOnMissions}
          currentMission = {this.props.questHistory.length}
          voteTrack='{"0": [false, false, true], "1": [false, true], "2": [true], "3": [], "4": []}'
          messageDisplay = {`You are on a mission with ${this.props.missionPlayers.join(' and ') + '.'}\n
            Do you want the mission to fail or succeed?`}
          />

        <div className="missionVoteScreenInput">
          <button className="missionFail" onClick={this.fail}>
            Fails
          </button>

          <button className="missionSucceed" onClick={this.succeed}>
            Succeeds
          </button>
        </div>

      </div>
      )}
}

export default MissionVoteScreen
