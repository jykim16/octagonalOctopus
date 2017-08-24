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
      <span className={`circle ${props.voteTrack[0] ? 'pass' : 'fail'} ${props.voteTrack.length >= 0 ? 'active' : 'inactive'}`}>{`${props.voteTrack[0] ? 'agree' : 'fail'}`}</span>
      <span className={`circle ${props.voteTrack[1] ? 'pass' : 'fail'} ${props.voteTrack.length >= 1 ? 'active' : 'inactive'}`}>{`${props.voteTrack[1] ? 'agree' : 'fail'}`}</span>
      <span className={`circle ${props.voteTrack[2] ? 'pass' : 'fail'} ${props.voteTrack.length >= 2 ? 'active' : 'inactive'}`}>{`${props.voteTrack[2] ? 'agree' : 'fail'}`}</span>
      <span className={`circle ${props.voteTrack[3] ? 'pass' : 'fail'} ${props.voteTrack.length >= 3 ? 'active' : 'inactive'}`}>{`${props.voteTrack[3] ? 'agree' : 'fail'}`}</span>
      <span className={`circle ${props.voteTrack[4] ? 'pass' : 'fail'} ${props.voteTrack.length >= 4 ? 'active' : 'inactive'}`}>{`${props.voteTrack[4] ? 'agree' : 'fail'}`}</span>
    </div>
  );
}

export default VoteTrack;

VoteTrack.propTypes = {
  isHost: PropTypes.func,
  voteTrack: PropTypes.array
}
