import PropTypes from 'prop-types';
import React from 'react';

let VoteTrack = (props) => {
  var voteTrack = JSON.parse(props.voteTrack);
  return (
    <div className='votetrack'>
      {(props.currentMission !== props.selectedMission) ? <div className='title' style={{fontSize:'3vw'}}>Vote History</div> : <div className='title' style={{fontSize:'3vw'}}>Vote Track</div> }

      <div className='displayHelp'>{`
          The vote tracker displays how many times teams have been rejected to go on a quest.
          if 4 consecutive teams are failed, the next team must go on the mission without a vote.`}
      </div>
      <span className={`circle ${voteTrack[props.selectedMission][0] ? 'pass' : 'fail'} ${voteTrack[props.selectedMission].length > 0 ? 'active' : 'inactive'}`}>{`${voteTrack[props.selectedMission][0] ? 'agree' : 'fail'}`}</span>
      <span className={`circle ${voteTrack[props.selectedMission][1] ? 'pass' : 'fail'} ${voteTrack[props.selectedMission].length > 1 ? 'active' : 'inactive'}`}>{`${voteTrack[props.selectedMission][1] ? 'agree' : 'fail'}`}</span>
      <span className={`circle ${voteTrack[props.selectedMission][2] ? 'pass' : 'fail'} ${voteTrack[props.selectedMission].length > 2 ? 'active' : 'inactive'}`}>{`${voteTrack[props.selectedMission][2] ? 'agree' : 'fail'}`}</span>
      <span className={`circle ${voteTrack[props.selectedMission][3] ? 'pass' : 'fail'} ${voteTrack[props.selectedMission].length > 3 ? 'active' : 'inactive'}`}>{`${voteTrack[props.selectedMission][3] ? 'agree' : 'fail'}`}</span>
      <span className={`circle ${voteTrack[props.selectedMission][4] ? 'pass' : 'fail'} ${voteTrack[props.selectedMission].length > 4 ? 'active' : 'inactive'}`}>{`${voteTrack[props.selectedMission][4] ? 'agree' : 'fail'}`}</span>
    </div>
  );
}

export default VoteTrack;

VoteTrack.propTypes = {
  isHost: PropTypes.func,
  voteTrack: PropTypes.string
}
