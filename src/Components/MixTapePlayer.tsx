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
  const [flipper, setFlipper] = useState(true);
  const [tapeDone, setTapeDone] = useState(false);

  useEffect(() => {
    setTapeDone(false);
    setFlipper(true);
    setTrackIndex(0);
  }, [tracks])


  const nextTrack = () => {
    if (trackIndex + 3 <= tracks.length) {
      setTrackIndex(trackIndex + 2);
      setFlipper(!flipper);
    }
    else { setTapeDone(true) }
  }


  return (
    <div>
      {tapeDone ? <></> :
        <div>
          {flipper ? <YouTube
            videoId={tracks[trackIndex].src}
            opts={{
              playerVars: {
                start: Math.floor(tracks[trackIndex].start),
                end: Math.floor(tracks[trackIndex].end),
                autoplay: 1,
              },
            }}
            onEnd={() => setFlipper(!flipper)}
          /> : <>there</>}

          {!flipper && tracks[trackIndex + 1] ?
            <YouTube
              videoId={tracks[trackIndex + 1].src}
              opts={{
                playerVars: {
                  start: Math.floor(tracks[trackIndex + 1].start),
                  end: Math.floor(tracks[trackIndex + 1].end),
                  autoplay: 1,
                },
              }}
              onEnd={nextTrack}
            /> : <></>
          }
        </div>
      }


    </div>
  );
};
export default MixTapePlayer;
