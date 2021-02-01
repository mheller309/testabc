import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

interface PlayerProps {
  url: string | undefined;
  onDuration: (n: number) => void;
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
  volume,
}) => (
  <StyledReactPlayer
    url={url}
    playing={playing}
    controls={false}
    onDuration={onDuration}
    volume={volume}
  />
);

export default Player;
