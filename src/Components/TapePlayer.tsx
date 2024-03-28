import { useEffect, useRef, useState } from "react";
import Tape from "./Tape";
import "./css/TapePlayer.css";


enum imagePaths {
    ejectUnpressed = "https://i.imgur.com/o9Eq9Wu.png",
    ejectPressed = "https://i.imgur.com/ITUIL0X.png",
    soundsUnpressed = "https://i.imgur.com/QlUqrZp.png",
    soundsPressed = "https://i.imgur.com/1lFpdlr.png",
    visualsUnpressed = "https://i.imgur.com/NQ2oyMc.png",
    visualsPressed = "https://i.imgur.com/3UVBw82.png",
    importUnpressed = "https://i.imgur.com/9ljJOOz.png",
    importPressed = "https://i.imgur.com/ETQkTR2.png",
    extraUnpressed = "https://i.imgur.com/sDRsQf0.png",
    extraPressed = "https://i.imgur.com/nkZsUAW.png",
    tapeConsole = "https://i.imgur.com/KI8mh0y.png",
    consoleLid = "https://i.imgur.com/tGTeMNt.png",
    defaultTapeImg = "https://i.imgur.com/Lo1vCp9.png",
    buttonLabels = "https://i.imgur.com/CPU7UZq.png"
}


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
    coverID: string;
    displayLabels: boolean;

    tapeEjected: boolean;
    recordingConsoleOpen: boolean;
    mixTapeMode: boolean;
    mixTapeName: string;
}

const TapePlayer: React.FC<TapePlayerProps> = ({ onEjectButton, onSFX_Button, onVis_Button, onImp_Button, onExt_Button, coverID, tapeEjected, displayLabels, recordingConsoleOpen, mixTapeName, mixTapeMode}) => {
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

    useEffect(() => {
        if(recordingConsoleOpen){
            setExtraImageSrc(imagePaths.extraPressed);
        } else {
            setExtraImageSrc(imagePaths.extraUnpressed);
        }
    }, [recordingConsoleOpen])


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
                <div className={ ejected?"tape down-animation":"tape up-animation"}><Tape coverArt={cover} mixTapeMode={mixTapeMode} mixTapeName={mixTapeName}/></div>
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