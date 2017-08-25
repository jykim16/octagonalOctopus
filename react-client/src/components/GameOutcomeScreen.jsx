import React from 'react';
var _ = require('lodash');

import MissionHistory from './MissionHistory.jsx';

class GameOutcomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.newGame = this.newGame.bind(this);
  }

  newGame() {
    this.props.socket.emit('newGame', {roomname: this.props.roomname});
  }

  render() {
    var result;
      if(this.props.merlinchoice === null) {
        if(this.props.gameresult) {
          result = ( <p>GOOD GUYS WIN!</p>)
        } else {
          result = <p>SPIES WIN!!</p>
        }
      } else if (this.props.merlinchoice === true) {
        result = <p>SPIES WIN!!</p>
      } else {
        result = <p>GOOD GUYS WIN!!</p>
      }


    return (

      <div id="gameOutcomeScreen">
        <h5> Game Outcome  </h5>

        <MissionHistory history={this.props.history} numPeopleOnMissions={this.props.numPeopleOnMissions} missionHistory={this.props.history}/>

        <div>{result}</div>


       <ul>
        {_.map(this.props.playermap, (role, user)=>{
          return (<li>{user} - {role}</li>)
        })
       }
       </ul>



        <button onClick={this.newGame}>
        {'Play Again'}
        </button>

      </div>
      )}
}

export default GameOutcomeScreen;
