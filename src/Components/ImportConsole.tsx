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
            <input
                type="text"
                value={embedValue}
                onChange={(e) => setEmbedValue(e.target.value)}
                className="import-input"
            />
            <button className="import-input" onClick={handleImport}>Import</button>
        </div>
    )
}

export default ImportConsole;