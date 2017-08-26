import React from 'react';

import InfoPanel from './InfoPanel.jsx';
import Timer from './Timer.jsx';
import GameBoard from './GameBoard/GameBoard.jsx';

class MerlinChoiceScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendInfo = this.sendInfo.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
   handleSubmit(event) {
    event.preventDefault();
  }

  sendInfo() {
    this.props.socket.emit('merlinselection', {choice: this.state.value, roomname: this.props.roomname});
  }

  render() {

    return (
      <div id="merlinChoiceScreen">
        <InfoPanel role={this.props.role} missionHistory={this.props.history} />
        <GameBoard
          history = {this.props.questHistory}
          numPeopleOnMissions = {this.props.numPeopleOnMissions}
          currentMission = {this.props.questHistory.length}
          voteTrack={this.props.voteTrack}
          messageDisplay = {`Choose Your Merlin:`}
          />

         <form onSubmit={this.handleSubmit}>
        <label>

          <select value={this.state.value} onChange={this.handleChange}>
          <option>please select</option>
          {this.props.players.map((player, index)=>{
            return(<option key={index}>{player}</option>)
          })}
          </select>
        </label>
        <input type="submit" value="Submit" onClick={this.sendInfo} />
      </form>

      </div>
      )}
}

export default MerlinChoiceScreen;
