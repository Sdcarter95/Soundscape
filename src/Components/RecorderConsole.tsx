import { useEffect, useState } from 'react';
import MixTape from './MixTape';
import { track } from './MixTape';
import "./css/RecorderConsole.css";


enum imagePaths {
    label = "https://drive.google.com/uc?export=view&id=1MgUP8CZf7Ma8NtCtrJtqCoS1c29Ev8q6",
  }

export interface mixedTape {
    tracks: track[],
    name: string,
    artSrc: string
}

interface RecorderProps {
    getTimeCode: () => string;
    playMixTape: (tracks: track[]) => void;
    exportMixTape: (mixTape: mixedTape) => void;
    videoSrc: string;
    coverSrc: string;
    tapePlaying: boolean;
}

const RecorderConsole: React.FC<RecorderProps> = ({ getTimeCode, playMixTape, exportMixTape, coverSrc, videoSrc, tapePlaying }) => {
    const [recording, setRecording] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [workingTrack, setWorkingTrack] = useState<track | null>(null);
    const [playing, setPlaying] = useState<boolean>(false);
    const [workingTape, setWorkingTape] = useState<track[] | null>(null);
    const [mixTapeTitle, setMixTapeTitle] = useState<string>("");

    useEffect(() => {
        if (endTime != "") {
            const newTrack: track = {
                src: videoSrc,
                start: parseFloat(startTime),
                end: parseFloat(endTime)
            }
            setWorkingTrack(newTrack);
            setEndTime("");
        }
    }, [endTime]);

    useEffect(() => {
        setPlaying(tapePlaying);
    }, [tapePlaying])

    const handleRecord = () => {
        const timeCode = getTimeCode();
        if (timeCode === "N/A") {
            alert("invalid record src");
        } else {
            if (!recording) {
                setStartTime(timeCode);
            } else {
                setEndTime(timeCode);
            }
            setRecording(!recording);
        }
    }

    const handlePlay = () => {
        if (workingTape) {
            setPlaying(!playing);
            playMixTape(workingTape);
        }

    }

    const handleUpdateTape = (mixTape: track[]) => {
        setWorkingTape(mixTape);
    }

    const handleExport = () => {
        if (workingTape) {
            const newMixedTape: mixedTape = {
                tracks: workingTape,
                name: mixTapeTitle,
                artSrc: imagePaths.label
            }
            exportMixTape(newMixedTape);
        } else {
            alert("Record on the tape before exporting");
        }

    }

    return (
        <div>
            <div className='recorder'>
                <p style={{ position: "absolute", top: "1vh", color: "white", fontSize: "large" }}>Recording is still in Prototype</p>
                <input className='name-tape-input' type="text" value={mixTapeTitle} onChange={(event) => setMixTapeTitle(event.target.value)} />

                <div className='mix-tape-wrapper'>
                    <MixTape coverSrc={coverSrc} newTrack={workingTrack} updateTape={handleUpdateTape} mixTapeTitle={mixTapeTitle} />
                </div>
                <div className='mt-button-bar'>
                    <button onClick={handleRecord}>{!recording ? <p>Record</p> : <p>Stop</p>}</button>
                    <button onClick={handlePlay}>{!playing ? <p>Play</p> : <p>Stop</p>}</button>
                    <button onClick={() => handleExport()} >Export</button>
                    <button onClick={() => alert("Erasing has not yet been implemented")}>Erase</button>
                </div>
            </div>
        </div>
    );
}

export default RecorderConsole;
