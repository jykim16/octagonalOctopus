import PropTypes from 'prop-types';
import React from 'react';

let Missions = (props) => {

  return (
    <div className='outer'>
      <span className={`circle ${props.history[0] ? 'pass' : 'fail'} ${props.currentMission >= 0 ? 'active' : 'inactive'}`}>{props.numPeopleOnMission[0]}</span>
      <span className={`circle ${props.history[1] ? 'pass' : 'fail'} ${props.currentMission >= 1 ? 'active' : 'inactive'}`}>{props.numPeopleOnMission[1]}</span>
      <span className={`circle ${props.history[2] ? 'pass' : 'fail'} ${props.currentMission >= 2 ? 'active' : 'inactive'}`}>{props.numPeopleOnMission[2]}</span>
      <span className={`circle ${props.history[3] ? 'pass' : 'fail'} ${props.currentMission >= 3 ? 'active' : 'inactive'}`}>{props.numPeopleOnMission[3]}</span>
      <span className={`circle ${props.history[4] ? 'pass' : 'fail'} ${props.currentMission >= 4 ? 'active' : 'inactive'}`}>{props.numPeopleOnMission[4]}</span>
    </div>
  );
}

export default Missions;

Missions.propTypes = {
  history: PropTypes.array,
  playerVotes: PropTypes.array,
  numPeopleOnMission: PropTypes.array,
  currentMission: PropTypes.number
}
