import { useEffect, useState } from 'react';
import MixTape from './MixTape';
import { track } from './MixTape';
import "./css/RecorderConsole.css";


interface RecorderProps {
    getTimeCode: () => string;
    playMixTape: (mixTape: track[]) => void;
    videoSrc: string;
    coverSrc: string;
    tapePlaying: boolean;
}
const RecorderConsole: React.FC<RecorderProps> = ({ getTimeCode, playMixTape, coverSrc, videoSrc, tapePlaying }) => {
    const [recording, setRecording] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [workingTrack, setWorkingTrack] = useState<track | null>(null);
    const [playing, setPlaying] = useState<boolean>(false);
    const [workingTape, setWorkingTape] = useState<track[] | null>(null);

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

    return (
        <div>
            <div className='recorder'>
            <p style={{position:"absolute", top:"1vh", color:"white", fontSize:"large"}}>Recording is still in Prototype</p>
                <div className='mix-tape-wrapper'>
                    <MixTape coverSrc={coverSrc} newTrack={workingTrack} updateTape={handleUpdateTape} />
                </div>
                <div className='mt-button-bar'>
                    <button onClick={handleRecord}>{!recording ? <p>Record</p> : <p>Stop</p>}</button>
                    <button onClick={handlePlay}>{!playing ? <p>Play</p> : <p>Stop</p>}</button>
                    <button onClick={() => alert("Exporting has not yet been implemented")} >Export</button>
                    <button onClick={() => alert("Erasing has not yet been implemented")}>Erase</button>
                </div>
            </div>
        </div>
    );
}

export default RecorderConsole;
