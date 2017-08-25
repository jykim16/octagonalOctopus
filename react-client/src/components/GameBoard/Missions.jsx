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
      <div className={`mission ${props.selectedMission === 0 ? 'selected' : ''}`}>
        <span className={`circle ${props.history[0] ? 'pass' : 'fail'} ${props.currentMission > 0 ? 'active' : 'inactive'}`} onClick={()=>{props.setSelectedMission(0)}} >{props.numPeopleOnMissions[0]}</span>
      </div>
      <div className={`mission ${props.selectedMission === 1 ? 'selected' : ''}`}>
        <span className={`circle ${props.history[1] ? 'pass' : 'fail'} ${props.currentMission > 1 ? 'active' : 'inactive'}`} onClick={()=>{props.setSelectedMission(1)}}>{props.numPeopleOnMissions[1]}</span>
      </div>
      <div className={`mission ${props.selectedMission === 2 ? 'selected' : ''}`}>
        <span className={`circle ${props.history[2] ? 'pass' : 'fail'} ${props.currentMission > 2 ? 'active' : 'inactive'}`} onClick={()=>{props.setSelectedMission(2)}}>{props.numPeopleOnMissions[2]}</span>
      </div>
      <div className={`mission ${props.selectedMission === 3 ? 'selected' : ''}`}>
        <span className={`circle ${props.history[3] ? 'pass' : 'fail'} ${props.currentMission > 3 ? 'active' : 'inactive'}`} onClick={()=>{props.setSelectedMission(3)}}>{props.numPeopleOnMissions[3]}</span>
      </div>
      <div className={`mission ${props.selectedMission === 4 ? 'selected' : ''}`}>
        <span className={`circle ${props.history[4] ? 'pass' : 'fail'} ${props.currentMission > 4 ? 'active' : 'inactive'}`} onClick={()=>{props.setSelectedMission(4)}}>{props.numPeopleOnMissions[4]}</span>
      </div>
    </div>
  );
}

export default Missions;

Missions.propTypes = {
  history: PropTypes.array,
  numPeopleOnMissions: PropTypes.array,
  currentMission: PropTypes.number,
  setCurrentMission: PropTypes.func
}
