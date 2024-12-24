import React, { useState } from "react";
import "./css/EditTapeCase.css";
import { EditMixtapeImagePaths } from "./utils/Constants";

interface EditTapeProps {
    coverArtSrc: string;
    onSaveCoverArt: (path: string) => void
  }
const Tape:React.FC<EditTapeProps> = ({coverArtSrc, onSaveCoverArt}) =>  {
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
            <img 
                className={editCoverFieldOpen 
                    ? linkPasted
                        ? "cover-art-button new-image-src-open invisible"
                        : "cover-art-button new-image-src-open"
                    : "cover-art-button"} 
                src={EditMixtapeImagePaths.editIcon}
                onClick={() => setEditCoverFieldOpen(!editCoverFieldOpen)}
            />
            <img className='case' src={EditMixtapeImagePaths.case}/>
            <img className='case-cover' src={coverArtSrc}/>
            {imageSrcInputField}
            {saveIcon}
        </div>
    );
}

export default Tape;
