import React from 'react';

/**
 * 
 * @param {string} name 
 * @param {string} msgTime 
 * @param {string} message
 * @param {number} i 
 * @param {boolean} owner 
 * 
 * 
 * @returns {SingleMsg} HTML
 */

function SingleMsg({  name, msgTime, message, owner, i }) {

  return (
    <div className={`container ${owner ? 'darker' : ''}`} key={i}>
      <p>{message}</p>
      <span className={owner ? `time-right` : `time-left`}>{msgTime?.toDate()?.toLocaleTimeString('en-US')} - {name}</span>
    </div>
  );
}

export default SingleMsg;
