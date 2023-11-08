import { useState, useEffect, useRef } from "react";
import YouTube from 'react-youtube';
import { track } from "./MixTape";

import "./css/MixTapePlayer.css"

declare global {
  interface Window {
    YT: any;
  }
}

export interface Track {
  src: string;
  start: number;
  end: number;
}

function MixTapePlayer({ tracks }: { tracks: Track[] }) {
  const [tapeDone, setTapeDone] = useState(false);

  const playerOne: any = useRef(null);
  const playerTwo: any = useRef(null);

  const [playerOnePlaying, setPlayerOnePlaying] = useState<boolean>(true);

  const [yt1, setYt1] = useState<any>(<></>)
  const [yt2, setYt2] = useState<any>(<></>)

  useEffect(() => {
    createPlayer(0, true)
    if (tracks.length > 1) {
      createPlayer(1, false)
    }
  }, [])



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
          setPlayerOnePlaying(false);
        }
      } else {
        if (playerOne.current) {
          playerOne.current.playVideo();
          setPlayerOnePlaying(true);
        }
      }
    }
  }


  const createPlayer = (trackIndex: number, autoplay: boolean) => {
    const src: string = tracks[trackIndex].src;
    const start: number = tracks[trackIndex].start;
    const end: number = tracks[trackIndex].end;
    const playerNumber = (trackIndex % 2) + 1;

    const newPlayer: any = (
      <YouTube
        videoId={src}
        opts={{
          height: "100%",
          width: "100%",
          playerVars: {
            start: Math.floor(start),
            end: Math.floor(end),
            autoplay: autoplay ? 1 : 0,
          },
        }}
        className="mix-tape-video"
        onEnd={() => handleEnd(playerNumber, trackIndex)}
        onReady={(event) => playerReady(event, playerNumber, trackIndex)}
      />
    )

    if (playerNumber == 1) { setYt1(newPlayer) } else { setYt2(newPlayer) }
  }


  return (
    <div>
      {tapeDone ? <></> :
        <div>
          <div style={playerOnePlaying ? { visibility: "visible" } : { visibility: "hidden" }} >
            {yt1}
          </div>
          <div style={playerOnePlaying ? { visibility: "hidden" } : { visibility: "visible" }} >
            {yt2}
          </div>
        </div>

      }
    </div>
  );
};
export default MixTapePlayer;
