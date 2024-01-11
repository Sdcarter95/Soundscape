import { useEffect, useRef, useState } from "react";
import Tape from "./Tape";
import "./css/TapePlayer.css";


enum imagePaths {
    ejectUnpressed = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQcYSUh0wm9TRWznD1hl6KNNXwl13FChsxvnyoMF_lk5zGYU_MeDR3gKSuHuzfS4I6KaCRqNWKdg-GQXow2bIfRo8io=s2560",
    ejectPressed = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYTg3gE1eFh-dLcpbZPj43RoTPTpF37qa0g5NmiWp7EQGUGIuQUJNU3_7ZouFQIEuMI2OT2spx-5pUvlEvcntIuey1atsA=s2560",
    soundsUnpressed = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQrURILW9d1ktSDPxbkmINJUVv1kJWWiYxd3heYrYZZfqARV7O_c5lekC4NhM8IBVeYMJHo5MXPDNUoTieYBsoiFiqD7w=s2560",
    soundsPressed = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYS4F2tFcbmI1g0OBzpsMFobJ8FUawyzWBhCjqs6Vyn7tMxUhDIdRU9bEL2Ex8WSEpjcu-Y7JxqN5fxIRPMSgyat7qeW5w=s2560",
    visualsUnpressed = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYSD0qLc_CSF8ebyd0IYIJNa8GXHesCkAYBvOt6d2YdxK7WlFM6HSoaGnSyF6cPoW_VKnLJ1ADObQvHeWqg1yDH32mhYfg=s2560",
    visualsPressed = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYRsNuE8qGEyQ4BLEHdwbiwIEBVy4ccqduRf62QcNB7E_yah_8NaW1Mff70SyJcGNxKHVv_Z3FVhjuJvdwqlT8dgB9TmEw=s2560",
    importUnpressed = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYTEW9EomBSj7dl-Aq-ZzTNYLDAAbBTm87XFXIr_2X0CX3FbvdnZVkvAtRJimtANFl9mQNart6rIo6nvNMfqUeLXcYAU-w=s2560",
    importPressed = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYSLUCCTqe_J-khcU-1omBJk3QZwEQUP02Z9Q_YYrhpAtLEWcOqs9o1G4Do6cwh62keqfLrKoV47ZAuYd9mjJLhhsyAAFg=s2560",
    extraUnpressed = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQcYSUh0wm9TRWznD1hl6KNNXwl13FChsxvnyoMF_lk5zGYU_MeDR3gKSuHuzfS4I6KaCRqNWKdg-GQXow2bIfRo8io=s2560",
    extraPressed = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYT1ZFWA0U8vLbF7jqXTKNB9Pq4Ml2dWpGSRgUvCEzcV1bKqfc6AQGdxXLHcQPFe6lOesTHSilJGlqtLsGs5r9O7evh9=s2560",
    tapeConsole = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYSHGR4cecOf51JZcslj6XE2_6ZCpYosyisg4SogltbVpj0EckIooKo3qbxWuTuLodW8f7vYg6iut-R8x-wHjRaD2fFE1Q=s1600",
    consoleLid = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYRNJi44DANwM-ZJ8NMrdNkWuN9AJbpuPEv-c28d_ltChNULEyf8J5HmLpCtWcQqQG17IO6NMEcaZuo6bfhNZ7WWgeIOJg=s1600",
    defaultTapeImg = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYSSwuP6W3Ebpq8V3oEvSdMM5sQExuksT6E3lLfiBXc4xVHILW8mKQQ6n_DdyMi5PTeDLk9eCoQyVE7CEtS3bKWW6iMLdw=s1600",
    buttonLabels = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYS2bQ1ePzSN121LjqBfoJtdsaNfaB-Co5z8R05uvswdnjvU2NRpCKYfqduMk50EwkN0VO1pqdD2i5gNZ6dmEXMO3n0gmQ=s1600"
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