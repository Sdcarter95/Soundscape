import { useState, useEffect, useRef } from "react";
import YouTube from 'react-youtube';
import { track } from "./MixTape";

import "./css/MixTapePlayer.css"

declare global {
  interface Window {
    YT: any;
  }
}

interface MixTapePlayerProps {
  tracks: track[],
  tapePlaying: boolean
}
const MixTapePlayer: React.FC<MixTapePlayerProps> = ({ tracks, tapePlaying }) => {
  const [tapeDone, setTapeDone] = useState(false);
  const [playerOneActive, setPlayerOneActive] = useState<boolean>(true);
  const [yt1, setYt1] = useState<any>(<></>)
  const [yt2, setYt2] = useState<any>(<></>)

  const playerOne: any = useRef(null);
  const playerTwo: any = useRef(null);

  useEffect(() => {
    createPlayer(0, true)
    if (tracks.length > 1) {
      createPlayer(1, false)
    }
  }, []);


  useEffect(() => {
    if (playerOneActive) {
      if (playerOne.current) {
        if (tapePlaying) {
          playerOne.current.pauseVideo();
        } else {
          playerOne.current.playVideo();
        }

      }
    } else {
      if (playerTwo.current){
        if(tapePlaying){
          playerTwo.current.pauseVideo();
        } else {
          playerTwo.current.playVideo();
        }
      }
    }
  }, [tapePlaying]);

  const playerReady = (event: { target: any; }, playerNumber: number, trackIndex: number) => {
    const player = event.target;
    if (playerNumber == 1) {
      playerOne.current = player;
    } else {
      playerTwo.current = player;
    }
  };

  const handleEnd = (playerNumber: number, trackIndex: number) => {
    if (tracks[trackIndex + 2]) {
      createPlayer(trackIndex + 2, false);
    }

    if (tracks[trackIndex + 1]) {
      if (playerNumber == 1) {
        if (playerTwo.current) {
          playerTwo.current.playVideo();
          setPlayerOneActive(false);
        }
      } else {
        if (playerOne.current) {
          playerOne.current.playVideo();
          setPlayerOneActive(true);
        }
      }
    }
  }


  const createPlayer = (trackIndex: number, autoplay: boolean) => {
    const src: string = tracks[trackIndex].src;
    const start: number = tracks[trackIndex].start;
    const end: number = tracks[trackIndex].end;
    const playerNumber = (trackIndex % 2) + 1;
    let trackBuffered = false;

    const newPlayer: any = (
      <YouTube
        videoId={src}
        opts={{
          height: "100%",
          width: "100%",
          playerVars: {
            start: Math.floor(start),
            end: Math.ceil(end),
            autoplay: autoplay ? 1 : 1,
          },
        }}
        className="mix-tape-video"
        onEnd={() => handleEnd(playerNumber, trackIndex)}
        onReady={(event) => playerReady(event, playerNumber, trackIndex)}
        onStateChange={(event) => {
          // Check for buffering (state 3)
          if (event.data != 3 && !trackBuffered && trackIndex != 0) {
            event.target.pauseVideo();
            trackBuffered = true;
          }
        }}
      />
    )

    if (playerNumber == 1) { setYt1(newPlayer) } else { setYt2(newPlayer) }
  }


  return (
    <div>
      {tapeDone ? <></> :
        <div>
          <div style={playerOneActive ? { visibility: "visible" } : { visibility: "hidden" }} >
            {yt1}
          </div>
          <div style={playerOneActive ? { visibility: "hidden" } : { visibility: "visible" }} >
            {yt2}
          </div>
        </div>

      }
    </div>
  );
};
export default MixTapePlayer;
