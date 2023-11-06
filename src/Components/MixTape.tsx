import { useEffect, useState } from "react";
import "./css/MixTape.css";

enum imagePaths {
    tape = "https://drive.google.com/uc?export=view&id=1fsfZUvL2C0Djd7djBBvsEwAE_KkWoFL6",
}

export interface track {
    src: string;
    start: number;
    end: number;
}
interface MixTapeProps {
    newTrack: track|null;
    coverSrc: string;
}

const MixTape: React.FC<MixTapeProps> = ({coverSrc, newTrack}) => {
    const [tracks, setTracks] = useState<track[]>([])

    useEffect(() => {
        if (newTrack){
            if (newTrack.end - newTrack.start > 1){
                setTracks([...tracks, newTrack]);
            } 
        }
    }, [newTrack])

    const infoDump = (trackList: track[]) => {
        for (const track of trackList) {
            alert("track src: " + track.src + "\nStart: " + track.start + "\nEnd: " + track.end);
        }
    }
    return (
        <div>
            <img className='mix-tape' style={{ top: "30vh" }} src={imagePaths.tape} onClick={() => infoDump(tracks)}></img>
            {/*<img className='tape cover-art' style={{ width: "93%", left: "1vh", zIndex:3 }} src={coverSrc}></img>*/}
        </div>
    );
};

export default MixTape;