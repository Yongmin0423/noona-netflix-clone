// Example.jsx
import React from "react";
import YouTube from "react-youtube";

const Example = ({ trailerData }) => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <YouTube
      videoId={trailerData.results[0].key}
      opts={opts}
      onReady={onReady}
    />
  );
};

export default Example;
