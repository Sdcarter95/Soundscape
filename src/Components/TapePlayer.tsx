import { useEffect, useRef, useState } from "react";
import { Cassette } from "../App";
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
}


enum soundPaths {
    "switchPressed" = "https://docs.google.com/uc?export=download&id=1gedh2zkeYRfhKhUn61-rhphU_bEEKKQp",
    "tapeDeck" = "https://docs.google.com/uc?export=download&id=1XtWv60ze6CtM-geWnYHf3owgZ21URd4H"
}

interface TapePlayerProps {
    onEjectButton: () => void;
    onSFX_Button: () => void;
  }

const TapePlayer: React.FC<TapePlayerProps> = ({onEjectButton}) =>  {
    const [ejectImageSrc, setEjectImageSrc] = useState<string>(imagePaths.ejectUnpressed);
    const [soundsImageSrc, setSoundsImageSrc] = useState<string>(imagePaths.soundsUnpressed);
    const [visualsImageSrc, setVisualsImageSrc] = useState<string>(imagePaths.visualsUnpressed);
    const [importImageSrc, setImportImageSrc] = useState<string>(imagePaths.importUnpressed);
    const [extraImageSrc, setExtraImageSrc] = useState<string>(imagePaths.extraUnpressed);
    const [preloadedImages, setPreloadedImages] = useState<{ [key: string]: HTMLImageElement }>({});
    const switchAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        preloadImages(imagePaths);
    }, []);

    const handleEjectButton = () => {
        onEjectButton();
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
        playButtonAudio();
    }

    const handleVisualsButton = () => {
        if (visualsImageSrc === imagePaths.visualsUnpressed) {
            setVisualsImageSrc(imagePaths.visualsPressed);
        } else {
            setVisualsImageSrc(imagePaths.visualsUnpressed);
        }
        playButtonAudio();
    }

    const handleImportButton = () => {
        if (importImageSrc === imagePaths.importUnpressed) {
            setImportImageSrc(imagePaths.importPressed);
        } else {
            setImportImageSrc(imagePaths.importUnpressed);
        }
        playButtonAudio();
    }

    const handleExtraButton = () => {
        if (extraImageSrc === imagePaths.extraUnpressed) {
            setExtraImageSrc(imagePaths.extraPressed);
        } else {
            setExtraImageSrc(imagePaths.extraUnpressed);
        }
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
            <div className='TapeConsoleContainer'>
            <img className='ConsoleLid' src={imagePaths.consoleLid}></img>
            <img className='TapeConsole' src={imagePaths.tapeConsole}></img>
            <div className='ButtonBar'>
                <img className='EjectButton' src={ejectImageSrc} onClick={() => handleEjectButton()}></img>
                <img className='SoundsButton' src={soundsImageSrc} onClick={() => handleSoundsButton()}></img>
                <img className='VisualsButton' src={visualsImageSrc} onClick={() => handleVisualsButton()}></img>
                <img className='ImportButton' src={importImageSrc} onClick={() => handleImportButton()}></img>
                <img className='ExtraButton' src={extraImageSrc} onClick={() => handleExtraButton()}></img>
            </div>
        </div>
        </div>
    );
}

export default TapePlayer;