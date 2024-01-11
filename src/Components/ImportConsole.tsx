import { useState } from "react";
import "./css/ImportConsole.css"

enum imagePaths {
    youtubeLogo = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQX8IQ7l_4-9TC9a8252-4HN-Xc-TyAllTvSJnywDYTu3TiCAe8PVyTrlArvbqjxCL7oQbIxzg54twqDYRLagQ0wDMEGw=s2560",
    laptop = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYTggfAH5XC-R1mC5l4NkfpW0Pzw5VjgfRQTvU0r-Ai5NStkuKSDAaFKE2E81SWrmiDlc2QygsD5doNqL_lGTn1iPO7dCw=s1600",
    trashIcon = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYRXVLyxZD6fVZZxE3ih7xH_CrelqPYgxu3RVf7g7GbbP_wlwbdUsIOwt2lwhd3d7EIqTGcvCpCEoCY_oADaHVypxISymQ=s2560"
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