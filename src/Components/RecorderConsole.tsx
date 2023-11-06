import { useEffect, useState } from 'react';
import MixTape from './MixTape';
import { track } from './MixTape';
import "./css/RecorderConsole.css";


interface RecorderProps {
    getTimeCode: () => string;
    returnMixTape: (mixTape: track[]) => void;
    videoSrc: string;
    coverSrc: string;
}
const RecorderConsole: React.FC<RecorderProps> = ({getTimeCode, coverSrc, videoSrc, returnMixTape }) => {
    const [recording, setRecording] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [workingTrack, setWorkingTrack] = useState<track|null>(null);

    useEffect(() => {
        if(endTime!=""){
            const newTrack:track = {
                src: videoSrc,
                start: parseFloat(startTime),
                end: parseFloat(endTime)
            }
            setWorkingTrack(newTrack);
            setEndTime("");
        }
    }, [endTime]);

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

    const handleExportTape = (mixTape: track[]) => {
        returnMixTape(mixTape);
    }

    return (
        <div>
            <div className='recorder'>
                <div className='mix-tape-wrapper'>
                    <MixTape coverSrc={coverSrc} newTrack={workingTrack} returnTape={handleExportTape} />
                </div>
                <button className='mt-record-button' onClick={handleRecord}>{!recording ? <p>Record</p> : <p>Stop</p>}</button>
            </div>
        </div>
    );
}

export default RecorderConsole;
