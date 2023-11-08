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
    newTrack: track | null;
    coverSrc: string;
    updateTape: (tape: track[]) => void;
}

const MixTape: React.FC<MixTapeProps> = ({ coverSrc, newTrack, updateTape }) => {
    const [tracks, setTracks] = useState<track[]>([])

    useEffect(() => {
        if (newTrack) {
            if (newTrack.end - newTrack.start > 1) {
                setTracks([...tracks, newTrack]);
            }
        }
    }, [newTrack])

    useEffect(() => {
        if (tracks.length > 0) {
            updateTape(tracks);
        }
    }, [tracks])


    return (
        <div>
            <img className='mix-tape' style={{ top: "30vh" }} src={imagePaths.tape}></img>
            {/*<img className='tape cover-art' style={{ width: "93%", left: "1vh", zIndex:3 }} src={coverSrc}></img>*/}
        </div>
    );
};

export default MixTape;