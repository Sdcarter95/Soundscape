import { useEffect, useState } from "react";
import { MixTapeImagePaths } from "./utils/Constants";
import "./css/MixTape.css";

export interface track {
    src: string;
    start: number;
    end: number;
}
interface MixTapeProps {
    newTrack: track | null;
    coverSrc: string;
    mixTapeTitle: string;
    updateTape: (tape: track[]) => void;
}

const MixTape: React.FC<MixTapeProps> = ({ coverSrc, newTrack, mixTapeTitle, updateTape }) => {
    const [tracks, setTracks] = useState<track[]>([])
    const [title, setTitle] = useState<string>("");

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

    useEffect(() => {
        setTitle(mixTapeTitle);
    }, [mixTapeTitle])


    return (
        <div>
            <div className="mix-tape-wrapper">
                <img className='mix-tape' src={MixTapeImagePaths.tape} />
            </div>
            <div className="mix-tape-title">{title}</div>
            <div className='mixtape-cover-art-wrapper'>
                <img src={MixTapeImagePaths.label} className='mixtape-cover-art' />
            </div>

        </div>
    );
};

export default MixTape;