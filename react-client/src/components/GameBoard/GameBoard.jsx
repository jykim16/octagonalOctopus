import React from 'react';
import Missions from './Missions.jsx';
import VoteTrack from './VoteTrack.jsx';

class GameBoard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedMission: props.currentMission
    }
    this.setSelectedMission = this.setSelectedMission.bind(this);
  }

  setSelectedMission(i) {
    this.setState({
      selectedMission: i
    });
  }

  render() {
    if(this.props.messageDisplay) {
      var message = (<div className='playerInstructions'>{this.props.messageDisplay}</div>);
    }
    return (
      <div className='GameBoard'>
      <Missions className='Missions'
        history = {this.props.history}
        numPeopleOnMissions = {this.props.numPeopleOnMissions}
        selectedMission = {this.state.selectedMission}
        currentMission = {this.props.currentMission}
        setSelectedMission = {this.setSelectedMission}
      />
      <VoteTrack className='VoteTrack'
        voteTrack = {this.props.voteTrack}
        currentMission = {this.props.currentMission}
        selectedMission = {this.state.selectedMission}
        />
      {message}
      </div>
    );
  }
}

export default GameBoard;
