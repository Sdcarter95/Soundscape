import React, { useState } from "react";
import "./css/EditTapeCase.css";
import { EditMixtapeImagePaths } from "./utils/Constants";

interface EditTapeProps {
    coverArtSrc: string;
    tapeHovered: boolean;
    editTapeMode: boolean;
    onSaveCoverArt: (path: string) => void;
    onClose: () => void;
  }
const Tape:React.FC<EditTapeProps> = ({coverArtSrc, onSaveCoverArt, tapeHovered, editTapeMode, onClose}) =>  {
    const [editCoverFieldOpen, setEditCoverFieldOpen] = useState<boolean>(false);
    const [embedValue, setEmbedValue] = useState<string>();
    const linkPasted = (embedValue?.length && embedValue.length > 0);

    const imageSrcInputField = editCoverFieldOpen && (
        <input
            type="text"
            value={embedValue}
            onChange={(e) => setEmbedValue(e.target.value)}
            className="tape-display-text"
            placeholder="Paste Image Source Here"
        />
    );

    const handleSaveClicked = (src: string) => {
        setEditCoverFieldOpen(false);
        onSaveCoverArt(src);
    }

    const saveIcon = editCoverFieldOpen && linkPasted ? (
        <img 
            src={EditMixtapeImagePaths.saveIcon}
            className="save-icon"
            onClick={() => handleSaveClicked(embedValue)}
        />
    ) : null;

    return (
        <div >
            <div className={`${!editTapeMode && !tapeHovered? 'case-hiding' : ''} ${!editTapeMode && tapeHovered ? 'case-peaking' : ''} ${editTapeMode ? "case-animate-in": ""}`}>
                <img className="case"  src={EditMixtapeImagePaths.case}/>
                <img className="case-cover" src={coverArtSrc}/>
                <img 
                    className={editCoverFieldOpen 
                        ? `cover-art-button new-image-src-open ${
                            linkPasted
                                ? "invisible"
                                : ""
                            }`
                        : "cover-art-button"} 
                    src={EditMixtapeImagePaths.editIcon}
                    onClick={() => setEditCoverFieldOpen(!editCoverFieldOpen)}
                />
                {editTapeMode ? imageSrcInputField : null}
                {editTapeMode ? saveIcon : null}
            </div>
        </div>
    );
}

export default Tape;
