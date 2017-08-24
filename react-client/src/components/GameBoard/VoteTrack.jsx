import PropTypes from 'prop-types';
import React from 'react';

let VoteTrack = (props) => {

  return (
    <div className='votetrack'>
      <div>Vote Track</div>
      <span className={`circle ${props.voteTrack[0] ? 'pass' : 'fail'} ${props.voteTrack.length >= 0 ? 'active' : 'inactive'}`}></span>
      <span className={`circle ${props.voteTrack[1] ? 'pass' : 'fail'} ${props.voteTrack.length >= 1 ? 'active' : 'inactive'}`}></span>
      <span className={`circle ${props.voteTrack[2] ? 'pass' : 'fail'} ${props.voteTrack.length >= 2 ? 'active' : 'inactive'}`}></span>
      <span className={`circle ${props.voteTrack[3] ? 'pass' : 'fail'} ${props.voteTrack.length >= 3 ? 'active' : 'inactive'}`}></span>
      <span className={`circle ${props.voteTrack[4] ? 'pass' : 'fail'} ${props.voteTrack.length >= 4 ? 'active' : 'inactive'}`}></span>
    </div>
  );
}

export default VoteTrack;

VoteTrack.propTypes = {
  isHost: PropTypes.func,
  voteTrack: PropTypes.array
}
