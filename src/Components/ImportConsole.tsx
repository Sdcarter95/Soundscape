import { useState } from "react";
import "./css/ImportConsole.css"

enum imagePaths {
    youtubeLogo = "https://docs.google.com/uc?export=download&id=1W1QGP15tS7hbCztsXqv2gTsIWhzWT5No",
    laptop = "https://docs.google.com/uc?export=download&id=1LZHuGuINb6B1ItZrErplagK_AhK8nV3h"
}

interface ImportConsoleProps {
    onImport: (id: string) => void;
}

const ImportConsole: React.FC<ImportConsoleProps> = ({ onImport }) => {
    const [embedValue, setEmbedValue] = useState<string>("");


    const handleImport = () => {
        if (embedValue.split("v=")[1]) {
            onImport(embedValue.split("v=")[1])
        } else {
            alert("Invalid Youtube Link");
        }
    };


    return (
        <div>
            <div className='computer-wrapper'>
                <img src={imagePaths.laptop} className='computer-screen' />
                <img src={imagePaths.youtubeLogo} className='yt-logo' />
            </div>
            <div className="import-console">
                <h2 className="import-consol-title">You can paste any YouTube link here</h2>
                <input
                    type="text"
                    value={embedValue}
                    onChange={(e) => setEmbedValue(e.target.value)}
                    className="import-input"
                />
                <button className="import-url-button" onClick={handleImport}>Import</button>
            </div>
        </div>

    )
}

export default ImportConsole;