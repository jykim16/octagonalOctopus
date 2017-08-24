import React from 'react';
import GameOutcomeScreen from './components/GameOutcomeScreen.jsx';

class MissionHistory extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
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
