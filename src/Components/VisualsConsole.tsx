import { useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import "./css/VisualsConsole.css"
import React from "react";
import { checkImagePath } from "./utils/Constants";




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
            <img src={checkImagePath} className="check-image"/>
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