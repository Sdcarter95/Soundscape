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

  const nextTrack = () => {
    if (trackIndex + 2 <= tracks.length){
      setTrackIndex(trackIndex + 1);
    } 
  }


  return (
    <div>
      <YouTube
        videoId={tracks[trackIndex].src}
        opts={{
          playerVars: {
            start: Math.floor(tracks[trackIndex].start),
            end: Math.floor(tracks[trackIndex].end),
            autoplay: 1,
          },
        }}
        onEnd={nextTrack}
      />
    </div>
  );
};
export default MixTapePlayer;
