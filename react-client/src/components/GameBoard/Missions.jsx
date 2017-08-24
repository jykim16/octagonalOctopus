import PropTypes from 'prop-types';
import React from 'react';

let Missions = (props) => {

  return (
    <div>
      <div>
        <span className='title' style={{fontSize:'5vw', padding: '0 0 0 .4em'}}>Missions</span>
        <div className='displayHelp'>{`
            The Missions panel displays the outcome of the quests.
            A picture of Mordred means somone has sabotaged your mission!
            A picture of Merlin means a sufficient number of brave knights have succeed their mission`}
        </div>
      </div>
      <div className={`mission ${props.currentMission === 0 ? 'selected' : ''}`}>
        <span className={`circle ${props.history[0] ? 'pass' : 'fail'} ${props.currentMission >= 0 ? 'active' : 'inactive'}`} onClick={props.setCurrentMission(0)} >{props.numPeopleOnMission[0]}</span>
      </div>
      <div className={`mission ${props.currentMission === 1 ? 'selected' : ''}`}>
        <span className={`circle ${props.history[1] ? 'pass' : 'fail'} ${props.currentMission >= 1 ? 'active' : 'inactive'}`} onClick={props.setCurrentMission(1)}>{props.numPeopleOnMission[1]}</span>
      </div>
      <div className={`mission ${props.currentMission === 2 ? 'selected' : ''}`}>
        <span className={`circle ${props.history[2] ? 'pass' : 'fail'} ${props.currentMission >= 2 ? 'active' : 'inactive'}`} onClick={props.setCurrentMission(2)}>{props.numPeopleOnMission[2]}</span>
      </div>
      <div className={`mission ${props.currentMission === 3 ? 'selected' : ''}`}>
        <span className={`circle ${props.history[3] ? 'pass' : 'fail'} ${props.currentMission >= 3 ? 'active' : 'inactive'}`} onClick={props.setCurrentMission(3)}>{props.numPeopleOnMission[3]}</span>
      </div>
      <div className={`mission ${props.currentMission === 4 ? 'selected' : ''}`}>
        <span className={`circle ${props.history[4] ? 'pass' : 'fail'} ${props.currentMission >= 4 ? 'active' : 'inactive'}`} onClick={props.setCurrentMission(4)}>{props.numPeopleOnMission[4]}</span>
      </div>
    </div>
  );
}

export default Missions;

Missions.propTypes = {
  history: PropTypes.array,
  playerVotes: PropTypes.array,
  numPeopleOnMission: PropTypes.array,
  currentMission: PropTypes.number,
  setCurrentMission: PropTypes.func
}
