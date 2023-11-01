import { useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import "./css/VisualsConsole.css"




interface VidualsConsoleProps {
    toggleBackGround: () => void,
    backGroundState: boolean,
}

const VisualsConsole: React.FC<VidualsConsoleProps> = ({ toggleBackGround, backGroundState }) => {
    const [isChecked, setIsChecked] = useState(backGroundState);

    useEffect(() => {

    }, []);

    const handleToggle = (value: boolean) => {
        setIsChecked(value);
        toggleBackGround();
    };

    return (
        <div className="visuals-console">
            <div className="vc-switchboard">
                <span>
                    <div className="background-toggle-wrapper">
                        <ToggleSwitch isChecked={isChecked} onChange={handleToggle} />
                    </div>
                </span>
            </div>
        </div>
    );
}

export default VisualsConsole;