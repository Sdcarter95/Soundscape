import { useState } from "react";
import "./css/ImportConsole.css"

enum imagePaths {
    youtubeLogo = "https://i.imgur.com/YyL1OnI.png",
    laptop = "https://i.imgur.com/TkOmsNv.png",
    trashIcon = "https://i.imgur.com/uq2vAJs.png"
}

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
                <button className="import-url-button" onClick={handleImport}> Import</button>
                <img src={imagePaths.trashIcon} className="trash-icon" onClick={deleteCassette}/>
            </div>
        </div>

    )
}

export default ImportConsole;