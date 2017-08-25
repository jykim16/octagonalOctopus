import React from 'react';
import GameBoard from './GameBoard/GameBoard.jsx';

class MissionHistory extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
{    console.log('missionHistory: ', this.props.missionHistory)}
    <GameBoard
      history = {this.props.missionHistory}
      playerVotes = {[[true], [true, false]]}
      numPeopleOnMission = {[2,3,2,3,3]}
      currentMission = {this.props.history.length}
      voteTrack={[false, false, false, false, true]}
      />
    return (
      <div>
        <h6> Mission History   </h6>
        <ol>
        {this.props.missionHistory.map((outcome, index)=>{
          return(<li key={index}> {outcome[0]} </li>)
        })}
        </ol>
      </div>
      )}
}

export default MissionHistory;
