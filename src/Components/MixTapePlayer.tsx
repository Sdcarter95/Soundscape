import { useState, useEffect, useRef } from "react";
import YouTube from 'react-youtube';
import { track } from "./MixTape";

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
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [tapeDone, setTapeDone] = useState(false);

  const playerOne: any = useRef(null);
  const playerTwo: any = useRef(null);

  const [yt1, setYt1] = useState<any>(<></>)
  const [yt2, setYt2] = useState<any>(<></>)

  useEffect(() => {
    createPlayer(0, true)
    createPlayer(1, false)
    setTrackIndex(1);
  }, [])



  const playerReady = (event: { target: any; }, playerNumber: number) => {
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
        }
      } else {
        if (playerOne.current) {
          playerOne.current.playVideo();
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
          playerVars: {
            start: Math.floor(start),
            end: Math.floor(end),
            autoplay: autoplay ? 1 : 0,
          },
        }}
        onEnd={() => handleEnd(playerNumber, trackIndex)}
        onReady={(event) => playerReady(event, playerNumber)}
      />
    )

    if (playerNumber == 1) { setYt1(newPlayer) } else { setYt2(newPlayer) }
  }


  return (
    <div>
      {tapeDone ? <></> :
        <div>
          {yt1}
          {yt2}
        </div>
      }
    </div>
  );
};
export default MixTapePlayer;
