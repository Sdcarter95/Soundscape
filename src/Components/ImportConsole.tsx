import { useState } from "react";
import "./css/ImportConsole.css"
interface ImportConsoleProps {
    onImport: (id:string) => void;
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
        <div className="import-console">
            <h1 className="import-consol-title">Paste any youtube link here</h1>
            <input
                type="text"
                value={embedValue}
                onChange={(e) => setEmbedValue(e.target.value)}
                className="import-input"
            />
            <button className="import-url-button" onClick={handleImport}>Import</button>
        </div>
    )
}

export default ImportConsole;