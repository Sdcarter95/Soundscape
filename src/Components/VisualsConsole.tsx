import { useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import "./css/VisualsConsole.css"




interface VidualsConsoleProps {
    toggleBackGround: () => void,
    toggleMinimized: () => void,
    toggleLabels: () => void,
    backGroundState: boolean,
    minimizedState: boolean,
    labelsState: boolean
}

const VisualsConsole: React.FC<VidualsConsoleProps> = ({ toggleBackGround, backGroundState, toggleMinimized, minimizedState, toggleLabels, labelsState}) => {
    const [backgroundChecked, setBackgroundChecked] = useState(backGroundState);
    const [minimizedChecked, setMinimizedChecked] = useState(minimizedState);
    const [labelsChecked, setLabelsChecked] = useState(!labelsState);
    const checkIMG = "https://drive.google.com/uc?export=view&id=1FqQXwUDYEi1p_MuneE_ltw9mKvO1Sv7T";

    useEffect(() => {

    }, []);

    const handleBackgroundToggle = (value: boolean) => {
        setBackgroundChecked(value);
        toggleBackGround();
    };

    const handleMinimizeToggle = (value: boolean) => {
        setMinimizedChecked(value);
        toggleMinimized();
    }

    const handleLabelsToggle = (value: boolean) => {
        setLabelsChecked(value);
        toggleLabels();
    }

    return (
        <div className="visuals-console">
            <img src={checkIMG} className="check-image"/>
            <div className="vc-switchboard">
                <div className="toggle-wrapper">
                    <ToggleSwitch checked={backgroundChecked} onChange={handleBackgroundToggle} />
                </div>
                <div className="toggle-wrapper">
                    <ToggleSwitch checked={minimizedChecked} onChange={handleMinimizeToggle} />
                </div>
                <div className="toggle-wrapper">
                    <ToggleSwitch checked={labelsChecked} onChange={handleLabelsToggle} />
                </div>
            </div>
        </div>
    );
}

export default VisualsConsole;