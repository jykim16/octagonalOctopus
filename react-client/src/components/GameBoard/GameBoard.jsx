import React from 'react';
import Missions from './Missions.jsx';
import VoteTrack from './VoteTrack.jsx';

class GameBoard extends React.Component {

///gameboard has access to
// role={this.state.role}
// history={this.state.missionOutcome}
// failVotes={this.state.failVotes}
// successVotes={this.state.successVotes}
// socket={this.socket}
// roomname={this.state.accessCode}
// nextPage={this.nextPage}
// host = {this.state.host}
// extraInfo = {this.state.extraInfo}

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
  // var parseHistory(historyString) {
  //   return historyString.map((result)=> {
  //     if(Number(result[7]) > 0) {
  //
  //     }
  //   });
  // }
  render() {
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

      </div>
    );
  }
}

export default GameBoard;

//
//
//
//
//
// import React from 'react';
//
// import InfoPanel from './InfoPanel.jsx';
// import MissionHistory from './MissionHistory.jsx';
//
// class DiscussMissionPlayersScreen extends React.Component {
//
//   constructor(props) {
//     super(props);
//
//   }
//
//   render() {
//     return (
//       <div>
//
//         <InfoPanel role={this.props.role} extraInfo = {this.props.extraInfo}/>
//
//         <MissionHistory missionHistory={this.props.history} />
//
//          <h3> Discuss Which {this.props.missionSize} Players to Send on the Mission </h3>
//
//
//       </div>
//       )}
// }
//
// export default DiscussMissionPlayersScreen;
//
//
//
//
//
//
// class MissionHistory extends React.Component {
//
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     return (
//       <div>
//         <h6> Mission History   </h6>
//         <ol>
//         {this.props.missionHistory.map((outcome, index)=>{
//           return(<li key={index}> {outcome[0]} </li>)
//         })}
//         </ol>
//       </div>
//       )}
// }
//
// export default MissionHistory;
//
// class MissionOutcomeScreen extends React.Component {
//
//   constructor(props) {
//     super(props);
//
//     this.nextPage = this.nextPage.bind(this);
//     }
//
//   render() {
//
//     return (
//       <div id="missionOutcome">
//
//         <h4> Mission Outcome  </h4>
//
//         <InfoPanel role={this.props.role} missionHistory={this.props.history}  extraInfo = {this.props.extraInfo}/>
//
//         <p>
//         Fail votes: {this.props.failVotes}
//         </p>
//
//         <p>
//         Success votes: {this.props.successVotes}
//         </p>
//
//         <button onClick={this.nextPage}>
//         Next Mission!
//         </button>
//
//       </div>
//       )}
//
//   nextPage() {
//     if (this.props.host) {
//       this.props.nextPage('EnterMissionPlayersScreen')
//     } else {
//       this.props.nextPage('DiscussMissionPlayersScreen')
//     }
//   }
// }
