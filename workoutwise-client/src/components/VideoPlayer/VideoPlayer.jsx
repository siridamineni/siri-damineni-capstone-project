import React from "react";
import ReactPlayer from "react-player";
import "./VideoPlayer.scss";
function VideoPlayer({ url }) {
  return (
    <div className="video-player">
      <ReactPlayer
        url={url}
        controls
        playing={false}
        className="video-player__source"
      />
    </div>
  );
}

export default VideoPlayer;
