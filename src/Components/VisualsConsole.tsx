import { useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import "./css/VisualsConsole.css"




interface VidualsConsoleProps {
    toggleBackGround: () => void,
    toggleMinimized: () => void,
    backGroundState: boolean,
    minimizedState: boolean
}

const VisualsConsole: React.FC<VidualsConsoleProps> = ({ toggleBackGround, backGroundState, toggleMinimized, minimizedState}) => {
    const [backgroundChecked, setBackgroundChecked] = useState(backGroundState);
    const [minimizedChecked, setMinimizedChecked] = useState(minimizedState);
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
            </div>
        </div>
    );
}

export default VisualsConsole;