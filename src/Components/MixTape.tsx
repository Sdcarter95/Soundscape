import { useEffect, useState } from "react";
import "./css/MixTape.css";

enum imagePaths {
    tape = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQ3rujte1pPgHonF7v-qH_uoTEf4E9uNZ9j_dOSI-CBq4vKEq0FxFOAjYPVm7eWIuXyvj9-aDz1X96aMMmLrmLYwtsXOw=s2560",
    label = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYSGJyAUz7PwrJid_d206GE3pkOrUz14UxfqUTOZpDlDwvAtxAkgHPR6iR_QJXdsS6VfH-pOJbZva7RkFVdNExiAzKL76Q=s2560",
}

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
                <img className='mix-tape' src={imagePaths.tape} />
            </div>
            <div className="mix-tape-title">{title}</div>
            <div className='mixtape-cover-art-wrapper'>
                <img src={imagePaths.label} className='mixtape-cover-art' />
            </div>

        </div>
    );
};

export default MixTape;