import React from 'react';
import $ from 'jquery';

import InfoPanel from './InfoPanel.jsx';
import MissionHistory from './MissionHistory.jsx';
import GameBoard from './GameBoard/GameBoard.jsx';

class ApproveQuestScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selected: []};
    this.fail = this.fail.bind(this);
    this.succeed = this.succeed.bind(this);
  }

  fail(){
    this.props.socket.emit('quest vote', {participants: this.props.missionPlayers,roomname:this.props.roomname, vote: false });
    this.props.waiting();
  }
  succeed() {
    this.props.socket.emit('quest vote', {participants: this.props.missionPlayers, roomname:this.props.roomname, vote: true });
    this.props.waiting();
  }

  render() {
    return (
      <div id="enterMissionPlayersScreen">

        <InfoPanel role={this.props.role}   extraInfo = {this.props.extraInfo}/>
        <GameBoard
          history = {this.props.questHistory}
          numPeopleOnMissions = {this.props.numPeopleOnMissions}
          currentMission = {this.props.questHistory.length}
          voteTrack= {this.props.voteTrack}
          messageDisplay = {`${this.props.hostName} has proposed ${this.props.missionPlayers.join(' and ')} to go on the mission. Do you approve or reject this proposal?`}
          />
         <MissionHistory missionHistory={this.props.history}  />

         <div>
           <button onClick={this.fail}>
             Reject
           </button>

           <button onClick={this.succeed}>
             Approve
           </button>
          </div>
      </div>
    );
  }
}

export default ApproveQuestScreen;
