import React from "react";
import ReactPlayer from "react-player";
function VideoPlayer({ url }) {
  return (
    <div className="video-player">
      <ReactPlayer url={url} controls playing={false} height="450px" />
    </div>
  );
}

export default VideoPlayer;
