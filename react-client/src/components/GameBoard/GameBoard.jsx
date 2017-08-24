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
  }

  render() {
    return (
      <div>
        <Missions
          history = {[true, false]}
          playerVotes = {[[true], [true, false]]}
          numPeopleOnMission = {[1,2,3,4,5]}
          currentMission = {1}
        />
        <VoteTrack />
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
