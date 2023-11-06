import { useEffect, useRef, useState } from "react";
import Tape from "./Tape";
import "./css/TapePlayer.css";


enum imagePaths {
    ejectUnpressed = "https://drive.google.com/uc?export=view&id=1n6FUlwQtS2aVzsd7lX6YhYU4KIZlxJnR",
    ejectPressed = "https://drive.google.com/uc?export=view&id=1Lxp6bo_3TO5vhukXtVKclaWmi2pi3RpH",
    soundsUnpressed = "https://drive.google.com/uc?export=view&id=1LStluy0ZW_FHSu5XpAHcQ8N1Pg16PRg9",
    soundsPressed = "https://drive.google.com/uc?export=view&id=18vjz47BbB22eXA5UsUBPFfJJ-HSy0UCR",
    visualsUnpressed = "https://drive.google.com/uc?export=view&id=1eAuK_BVc-AWgX7LB4YNouP-w27DaXXi4",
    visualsPressed = "https://drive.google.com/uc?export=view&id=1GMLONSeKUsMWHjCI3prY_1Xd7fYNdYR9",
    importUnpressed = "https://drive.google.com/uc?export=view&id=1EfgEKXk0g1hf6jVpX-rl-XjoiTeI_xgp",
    importPressed = "https://drive.google.com/uc?export=view&id=1QVAUvUfxgdTJXKbpyTAEQGHmhjRubyLg",
    extraUnpressed = "https://drive.google.com/uc?export=view&id=1Bx_OMrGxQ9JVZvDUNSBG-bCBcq_FlsRq",
    extraPressed = "https://drive.google.com/uc?export=view&id=16JLtDVrIherm-G5oGGsekiVxvnAhUwIh",
    tapeConsole = "https://drive.google.com/uc?export=view&id=18Ilrn_rcXY8PMPCfn9I3HcWqRXHeWxTg",
    consoleLid = "https://drive.google.com/uc?export=view&id=1SmJujeBpbhVY8xAr8pEOTMbuys8nChKN",
    defaultTapeImg = "https://drive.google.com/uc?export=view&id=1IN3YLXurbF-5p_mzRuzU7PbKY8Uesogs",
    buttonLabels = "https://drive.google.com/uc?export=view&id=1fwOos_6kM4oUPyxrZMUxVgF7URqHkEEW"
}


enum soundPaths {
    "switchPressed" = "https://docs.google.com/uc?export=download&id=1gedh2zkeYRfhKhUn61-rhphU_bEEKKQp",
    "tapeDeck" = "https://docs.google.com/uc?export=download&id=1XtWv60ze6CtM-geWnYHf3owgZ21URd4H"
}

interface TapePlayerProps {
    onEjectButton: () => void;
    onSFX_Button: () => void;
    onVis_Button: () => void;
    onImp_Button: () => void;
    onExt_Button: () => void;
    coverID: string;
    tapeEjected: boolean;
    displayLabels: boolean;
}

const TapePlayer: React.FC<TapePlayerProps> = ({ onEjectButton, onSFX_Button, onVis_Button, onImp_Button, onExt_Button, coverID, tapeEjected, displayLabels}) => {
    const [ejectImageSrc, setEjectImageSrc] = useState<string>(imagePaths.ejectUnpressed);
    const [soundsImageSrc, setSoundsImageSrc] = useState<string>(imagePaths.soundsUnpressed);
    const [visualsImageSrc, setVisualsImageSrc] = useState<string>(imagePaths.visualsUnpressed);
    const [importImageSrc, setImportImageSrc] = useState<string>(imagePaths.importUnpressed);
    const [extraImageSrc, setExtraImageSrc] = useState<string>(imagePaths.extraUnpressed);
    const [preloadedImages, setPreloadedImages] = useState<{ [key: string]: HTMLImageElement }>({});
    const [ejected, setEjected] = useState<boolean>(false);
    const [cover, setCover] = useState<string>("");
    const switchAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        preloadImages(imagePaths);
    }, []);

    useEffect(() => {
        setCover(coverID);
        if (ejectImageSrc === preloadedImages[imagePaths.ejectUnpressed]?.src) {
            setEjectImageSrc(preloadedImages[imagePaths.ejectPressed]?.src);
        } else if (ejectImageSrc === preloadedImages[imagePaths.ejectPressed]?.src) {
            setEjectImageSrc(preloadedImages[imagePaths.ejectUnpressed]?.src);
        }

        if (coverID != imagePaths.defaultTapeImg){
            setEjected(false);
        }
    }, [coverID]);

    useEffect(() => {
       if (tapeEjected && ejectImageSrc === preloadedImages[imagePaths.ejectUnpressed]?.src){
        setEjectImageSrc(preloadedImages[imagePaths.ejectPressed]?.src);
        setEjected(true);
        playButtonAudio();
       } else if (!tapeEjected && ejectImageSrc === preloadedImages[imagePaths.ejectPressed]?.src) {
        setEjectImageSrc(preloadedImages[imagePaths.ejectUnpressed]?.src);
        setEjected(false);
        playButtonAudio();
       }
    }, [tapeEjected]);



    const handleEjectButton = () => {
        onEjectButton();
        setEjected(!ejected);
        if (ejectImageSrc === preloadedImages[imagePaths.ejectUnpressed]?.src) {
            setEjectImageSrc(preloadedImages[imagePaths.ejectPressed]?.src);
        } else {
            setEjectImageSrc(preloadedImages[imagePaths.ejectUnpressed]?.src);
        }
        playButtonAudio();
    }

    const handleSoundsButton = () => {
        if (soundsImageSrc === preloadedImages[imagePaths.soundsUnpressed]?.src) {
            setSoundsImageSrc(preloadedImages[imagePaths.soundsPressed]?.src);
        } else {
            setSoundsImageSrc(preloadedImages[imagePaths.soundsUnpressed]?.src);
        }
        onSFX_Button()
        playButtonAudio();
    }

    const handleVisualsButton = () => {
        if (visualsImageSrc === imagePaths.visualsUnpressed) {
            setVisualsImageSrc(imagePaths.visualsPressed);
        } else {
            setVisualsImageSrc(imagePaths.visualsUnpressed);
        }
        onVis_Button();
        playButtonAudio();
    }

    const handleImportButton = () => {
        if (importImageSrc === imagePaths.importUnpressed) {
            setImportImageSrc(imagePaths.importPressed);
        } else {
            setImportImageSrc(imagePaths.importUnpressed);
        }
        onImp_Button();
        playButtonAudio();
    }

    const handleExtraButton = () => {
        if (extraImageSrc === imagePaths.extraUnpressed) {
            setExtraImageSrc(imagePaths.extraPressed);
        } else {
            setExtraImageSrc(imagePaths.extraUnpressed);
        }
        onExt_Button();
        playButtonAudio();
    }

    const preloadImages = (path: typeof imagePaths) => {
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

    return (
        <div>
            <audio preload="auto" ref={switchAudioRef}>
                <source src={soundPaths.switchPressed} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div className='tape-console-container'>
                <img className='console-lid' src={imagePaths.consoleLid}></img>
                {ejected ? <div className="tape down-animation"><Tape coverArt={cover} /></div> : <div className="tape up-animation"><Tape coverArt={cover} /></div>}
                <img className='tape-console' src={imagePaths.tapeConsole}></img>
                <div className='button-bar'>
                    <img className='eject-button' src={ejectImageSrc} onClick={() => handleEjectButton()}></img>
                    <img className='sounds-button' src={soundsImageSrc} onClick={() => handleSoundsButton()}></img>
                    <img className='visuals-button' src={visualsImageSrc} onClick={() => handleVisualsButton()}></img>
                    <img className='import-button' src={importImageSrc} onClick={() => handleImportButton()}></img>
                    <img className='extra-button' src={extraImageSrc} onClick={() => handleExtraButton()}></img>
                </div>
                {displayLabels?<img src={imagePaths.buttonLabels} className='button-labels'/>:<></>}
            </div>
        </div>
    );
}

export default TapePlayer;