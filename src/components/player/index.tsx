import React, { useCallback } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

interface PlayerProps {
  url: string | undefined;
  onDuration: (n: number) => void;
  onProgress: (n: number) => void;
  playing: boolean;
  volume: number;
}

const StyledReactPlayer = styled(ReactPlayer)`
  pointer-events: none;
`;

const Player: React.FC<PlayerProps> = ({
  url,
  playing,
  onDuration,
  onProgress,
  volume,
}) => {
  const _onProgress = useCallback(({ played }) => onProgress(played), [
    onProgress,
  ]);
  return (
    <StyledReactPlayer
      url={url}
      playing={playing}
      controls={false}
      onDuration={onDuration}
      onProgress={_onProgress}
      volume={volume}
    />
  );
};

export default Player;
