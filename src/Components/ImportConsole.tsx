import { useState } from "react";
import "./css/ImportConsole.css";
import {LaptopImagePaths} from "./utils/Constants";
import React from "react";

interface ImportConsoleProps {
    onImport: (id: string) => void;
    deleteCassette: () => void;
}

const ImportConsole: React.FC<ImportConsoleProps> = ({ onImport, deleteCassette}) => {
    const [embedValue, setEmbedValue] = useState<string>("");

    const handleImport = () => {
        if (embedValue.split("v=")[1]) {
            onImport(embedValue.split("v=")[1]);
            setEmbedValue("");
        } else if (embedValue.split("youtu.be/")[1]){
            onImport(embedValue.split("youtu.be/")[1].split("?si=")[0]);
            setEmbedValue("");  
        } else {
            alert("Invalid Youtube Link");
        }
    };



    return (
        <div>
            <div className='computer-wrapper'>
                <img src={ LaptopImagePaths.laptop} className='computer-screen' />
                <img src={LaptopImagePaths.youtubeLogo} className='yt-logo' />
            </div>
            <div className="import-console">
                <h2 className="import-consol-title">You can paste any YouTube link here</h2>
                <input
                    type="text"
                    value={embedValue}
                    onChange={(e) => setEmbedValue(e.target.value)}
                    className="import-input"
                />
                <button className="import-url-button" onClick={handleImport}> Import</button>
                <img src={LaptopImagePaths.trashIcon} className="trash-icon" onClick={deleteCassette}/>
            </div>
        </div>

    )
}

export default ImportConsole;