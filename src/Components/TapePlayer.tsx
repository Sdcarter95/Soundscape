import { useEffect, useRef, useState } from "react";
import Tape from "./Tape";
import EditTapeCase from './EditTapeCase'
import { TapeDeckImagePaths } from "./utils/Constants";
import { MixTapeImagePaths } from "./utils/Constants";
import "./css/TapePlayer.css";
import React from "react";


enum soundPaths {
    "switchPressed" = "https://audio.jukehost.co.uk/iF4DAB3JCKYSl6TJK1d0qxb5HSDJkpCO",
    "tapeDeck" = "https://audio.jukehost.co.uk/qV6jeFrNBuFM83nSLWnoaUDwyNFsy0Tn"
}

interface TapePlayerProps {
    onEjectButton: () => void;
    onSFX_Button: () => void;
    onVis_Button: () => void;
    onImp_Button: () => void;
    onExt_Button: () => void;
    onEditCoverClicked: (src: string) => void;
    coverID: string;
    displayLabels: boolean;

    tapeEjected: boolean;
    recordingConsoleOpen: boolean;
    mixTapeMode: boolean;
    mixTapeName: string;
}

const TapePlayer: React.FC<TapePlayerProps> = ({ onEjectButton, onSFX_Button, onVis_Button, onImp_Button, onExt_Button, onEditCoverClicked,
    coverID, tapeEjected, displayLabels, recordingConsoleOpen, mixTapeName, mixTapeMode}) => {
    const [ejectImageSrc, setEjectImageSrc] = useState<string>(TapeDeckImagePaths.ejectUnpressed);
    const [soundsImageSrc, setSoundsImageSrc] = useState<string>(TapeDeckImagePaths.soundsUnpressed);
    const [visualsImageSrc, setVisualsImageSrc] = useState<string>(TapeDeckImagePaths.visualsUnpressed);
    const [importImageSrc, setImportImageSrc] = useState<string>(TapeDeckImagePaths.importUnpressed);
    const [extraImageSrc, setExtraImageSrc] = useState<string>(TapeDeckImagePaths.extraUnpressed);
    const [preloadedImages, setPreloadedImages] = useState<{ [key: string]: HTMLImageElement }>({});
    const [ejected, setEjected] = useState<boolean>(false);
    const [cover, setCover] = useState<string>("");
    const switchAudioRef = useRef<HTMLAudioElement | null>(null);

    const [editTapeMode, setEditTapeMode] = useState<boolean>(false);
    const [hoveringTape, setHoveringTape] = useState<boolean>(false);

    useEffect(() => {
        preloadImages(TapeDeckImagePaths);
    }, []);

    useEffect(() => {
        setCover(coverID);
        if (ejectImageSrc === preloadedImages[TapeDeckImagePaths.ejectUnpressed]?.src) {
            setEjectImageSrc(preloadedImages[TapeDeckImagePaths.ejectPressed]?.src);
        } else if (ejectImageSrc === preloadedImages[TapeDeckImagePaths.ejectPressed]?.src) {
            setEjectImageSrc(preloadedImages[TapeDeckImagePaths.ejectUnpressed]?.src);
        }

        if (coverID != MixTapeImagePaths.defaultTapeImg){
            setEjected(false);
        }
    }, [coverID]);

    useEffect(() => {
        setEditTapeMode(false);
       if (tapeEjected && ejectImageSrc === preloadedImages[TapeDeckImagePaths.ejectUnpressed]?.src){
        setEjectImageSrc(preloadedImages[TapeDeckImagePaths.ejectPressed]?.src);
        setEjected(true);
        playButtonAudio();
       } else if (!tapeEjected && ejectImageSrc === preloadedImages[TapeDeckImagePaths.ejectPressed]?.src) {
        setEjectImageSrc(preloadedImages[TapeDeckImagePaths.ejectUnpressed]?.src);
        setEjected(false);
        playButtonAudio();
       }
    }, [tapeEjected]);

    useEffect(() => {
        if(recordingConsoleOpen){
            setExtraImageSrc(TapeDeckImagePaths.extraPressed);
        } else {
            setExtraImageSrc(TapeDeckImagePaths.extraUnpressed);
        }
    }, [recordingConsoleOpen])


    const handleEjectButton = () => {
        onEjectButton();
        setEjected(!ejected);
        if (ejectImageSrc === preloadedImages[TapeDeckImagePaths.ejectUnpressed]?.src) {
            setEjectImageSrc(preloadedImages[TapeDeckImagePaths.ejectPressed]?.src);
        } else {
            setEjectImageSrc(preloadedImages[TapeDeckImagePaths.ejectUnpressed]?.src);
        }
        playButtonAudio();
    }

    const handleSoundsButton = () => {
        if (soundsImageSrc === preloadedImages[TapeDeckImagePaths.soundsUnpressed]?.src) {
            setSoundsImageSrc(preloadedImages[TapeDeckImagePaths.soundsPressed]?.src);
        } else {
            setSoundsImageSrc(preloadedImages[TapeDeckImagePaths.soundsUnpressed]?.src);
        }
        onSFX_Button()
        playButtonAudio();
    }

    const handleVisualsButton = () => {
        if (visualsImageSrc === TapeDeckImagePaths.visualsUnpressed) {
            setVisualsImageSrc(TapeDeckImagePaths.visualsPressed);
        } else {
            setVisualsImageSrc(TapeDeckImagePaths.visualsUnpressed);
        }
        onVis_Button();
        playButtonAudio();
    }

    const handleImportButton = () => {
        if (importImageSrc === TapeDeckImagePaths.importUnpressed) {
            setImportImageSrc(TapeDeckImagePaths.importPressed);
        } else {
            setImportImageSrc(TapeDeckImagePaths.importUnpressed);
        }
        onImp_Button();
        playButtonAudio();
    }

    const handleExtraButton = () => {
        onExt_Button();
        playButtonAudio();
    }

    const preloadImages = (path: typeof TapeDeckImagePaths) => {
        let imagesToLoad: any = [];
        Object.values(path).forEach((src) => {
            const img = new Image();
            img.src = src;
            imagesToLoad[src] = img;
        });
        setPreloadedImages(imagesToLoad)
    };

    const playButtonAudio = () => {
        if (switchAudioRef.current) {
            switchAudioRef.current.play();
        }
    }

    const handleEditTapeClicked = () => {
        if (tapeEjected) {
            setEditTapeMode(!editTapeMode);
        }
      }

      const handleTapeHover = (isHovering: boolean) => {
        setHoveringTape(isHovering);
    };

    return (
        <div>
            <audio preload="auto" ref={switchAudioRef}>
                <source src={soundPaths.switchPressed} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div className='tape-console-container'>
                <EditTapeCase 
                    coverArtSrc={cover} 
                    onSaveCoverArt={onEditCoverClicked}
                    tapeHovered={hoveringTape && ejected}
                    editTapeMode={editTapeMode}
                    onClose={() => setEditTapeMode(false)}
                />
                <img className='console-lid' src={TapeDeckImagePaths.lid}></img>
                <div className={ ejected ? "tape down-animation" :  "tape up-animation"}>
                    <Tape
                        coverArt={cover}
                        mixTapeMode={mixTapeMode}
                        mixTapeName={mixTapeName}
                        onEditClicked={handleEditTapeClicked}
                        onHoverChange={handleTapeHover}
                    />
                </div>
                <img className='tape-console' src={TapeDeckImagePaths.body}></img>
                <div className='button-bar'>
                    <img className='eject-button' src={ejectImageSrc} onClick={() => handleEjectButton()}></img>
                    <img className='sounds-button' src={soundsImageSrc} onClick={() => handleSoundsButton()}></img>
                    <img className='visuals-button' src={visualsImageSrc} onClick={() => handleVisualsButton()}></img>
                    <img className='import-button' src={importImageSrc} onClick={() => handleImportButton()}></img>
                    <img className='extra-button' src={extraImageSrc} onClick={() => handleExtraButton()}></img>
                </div>
                {displayLabels?<img src={TapeDeckImagePaths.buttonLabels} className='button-labels'/>:<></>}
            </div>
        </div>
    );
}

export default TapePlayer;