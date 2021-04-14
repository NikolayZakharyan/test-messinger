import React from 'react';

function SingleMsg({ id, name, msgTime, message, owner, i }) {

  return (
    <div className={`container ${owner ? 'darker' : ''}`} key={i}>
      <p>{message}</p>
      <span className={owner ? `time-right` : `time-left`}>{msgTime?.toDate()?.toLocaleTimeString('en-US')} - {name}</span>
    </div>
  );
}

export default SingleMsg;
