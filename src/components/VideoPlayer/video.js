import React from 'react';

const Video = (props) => {

  const {id, width, height, ...otherProps} = props;

  return(
    <div>
      <video id={id}></video>
    </div>
  )
}

export default Video;
