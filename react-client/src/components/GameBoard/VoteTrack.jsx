import PropTypes from 'prop-types';
import React from 'react';

let VoteTrack = (props) => {

  return (
    <div className='votetrack'>
      <div className='title' style={{fontSize:'3vw'}}>Vote Track</div>
      <div className='displayHelp'>{`
          The vote tracker displays how many times teams have been rejected to go on a quest.
          if 4 consecutive teams are failed, the next team must go on the mission without a vote.`}
      </div>
      <span className={`circle ${props.voteTrack[props.currentMission][0] ? 'pass' : 'fail'} ${props.voteTrack[props.currentMission].length > 0 ? 'active' : 'inactive'}`}>{`${props.voteTrack[props.currentMission][0] ? 'agree' : 'fail'}`}</span>
      <span className={`circle ${props.voteTrack[props.currentMission][1] ? 'pass' : 'fail'} ${props.voteTrack[props.currentMission].length > 1 ? 'active' : 'inactive'}`}>{`${props.voteTrack[props.currentMission][1] ? 'agree' : 'fail'}`}</span>
      <span className={`circle ${props.voteTrack[props.currentMission][2] ? 'pass' : 'fail'} ${props.voteTrack[props.currentMission].length > 2 ? 'active' : 'inactive'}`}>{`${props.voteTrack[props.currentMission][2] ? 'agree' : 'fail'}`}</span>
      <span className={`circle ${props.voteTrack[props.currentMission][3] ? 'pass' : 'fail'} ${props.voteTrack[props.currentMission].length > 3 ? 'active' : 'inactive'}`}>{`${props.voteTrack[props.currentMission][3] ? 'agree' : 'fail'}`}</span>
      <span className={`circle ${props.voteTrack[props.currentMission][4] ? 'pass' : 'fail'} ${props.voteTrack[props.currentMission].length > 4 ? 'active' : 'inactive'}`}>{`${props.voteTrack[props.currentMission][4] ? 'agree' : 'fail'}`}</span>
    </div>
  );
}

export default VoteTrack;

VoteTrack.propTypes = {
  isHost: PropTypes.func,
  voteTrack: PropTypes.object
}
