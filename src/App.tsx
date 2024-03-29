import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.png';
import './App.css';
import CassetteCarousel from './Components/CassetteCarousel';
import TapePlayer from './Components/TapePlayer';
import YouTube from "react-youtube";
import SoundConsole from './Components/SoundConsole';
import VisualsConsole from './Components/VisualsConsole';
import ImportConsole from './Components/ImportConsole';
import DeleteCassetteModal from "./Components/modals/DeleteCassetteModal";
import RecorderConsole from './Components/RecorderConsole';
import MixTapePlayer from './Components/MixTapePlayer';
import { track } from './Components/MixTape';
import { mixedTape } from './Components/RecorderConsole';

export interface Cassette {
  name: string,
  source: string,
  video_id: string
}

enum soundPaths {
  tapeDeck = "https://docs.google.com/uc?export=download&id=1XtWv60ze6CtM-geWnYHf3owgZ21URd4H",
}

enum imagePaths {
  defaultTape = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYSGJyAUz7PwrJid_d206GE3pkOrUz14UxfqUTOZpDlDwvAtxAkgHPR6iR_QJXdsS6VfH-pOJbZva7RkFVdNExiAzKL76Q=s2560",
}



function App() {
  const [videoSource, setVideoSource] = useState<string>("52FljdTl2_M");
  const [displayImage, setDisplayImage] = useState<string>(imagePaths.defaultTape);
  const tapeDeckAudioRef = useRef<HTMLAudioElement | null>(null);

  const [cassetteLibrary, setCassetteLibrary] = useState<Cassette[]>([]);
  const [mixedTapeLibrary, setMixedTapeLibrary] = useState<mixedTape[]>([]);

  const [quoteBook, setQuoteBook] = useState<string[]>([]);
  const [quote, setQuote] = useState<string>("");

  const [cassetteSelectionVisible, setCassetteSelectionVisible] = useState<boolean>(false);
  const [soundEffectsMenuVisible, setSoundEffectsMenuVisible] = useState<boolean>(false);
  const [importMenuVisible, setimportMenuVisible] = useState<boolean>(false);
  const [visualsMenuVisible, setVisualsMenuVisible] = useState<boolean>(false);
  const [recordingMenuVisible, setRecordingMenuVisible] = useState<boolean>(false);

  const [tapeEjected, setTapeEjected] = useState<boolean>(false);
  const [player, setPlayer] = useState<any>(null);
  const [soundEffectsMuted, setSoundEffectsMuted] = useState<boolean>(false);
  const [playerMinimized, setPlayerMinimized] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const [mixTape, SetMixTape] = useState<track[] | null>(null);
  const [mixedTapeName, setMixedTapeName] = useState<string>("");
  const [mixTapeMode, setMixTapeMode] = useState<boolean>(false);
  const [mixedTapeId, setMixedTapeId] = useState("");

  //display options
  const [backgroundDisplay, setBackgroundDisplay] = useState<boolean>(false);
  const [labelsDisplayed, setLabelsDisplayed] = useState<boolean>(true);


  useEffect(() => {
    let newLibrary: Cassette[] = [];
    newLibrary = loadDefaultCassettes(newLibrary);
    if (localStorage.getItem("importedLinks")) {
      const uploadedLinks: Cassette[] = JSON.parse(localStorage.getItem("importedLinks")!)
      const combinedLibrary: Cassette[] = [...newLibrary, ...uploadedLinks]
      setCassetteLibrary(combinedLibrary);
    } else {
      setCassetteLibrary(newLibrary);
    }

    let mixedTapeLibrary: mixedTape[] = [];
    if (localStorage.getItem("mixedTapes")) {
      const uploadedMixedTapes: mixedTape[] = JSON.parse(localStorage.getItem("mixedTapes")!);
      const combinedMixedTapeLibrary: mixedTape[] = [...mixedTapeLibrary, ...uploadedMixedTapes]
      setMixedTapeLibrary(combinedMixedTapeLibrary);
    } else {
      setMixedTapeLibrary(mixedTapeLibrary);
    }

    let newQuoteBook: string[] = [];
    newQuoteBook.push(`“Opportunities don't happen, you create them.”`);
    newQuoteBook.push(`“One sees in the world what they carry in their heart”`);
    newQuoteBook.push("“Doubt kills more dreams than failure ever will”");
    newQuoteBook.push("“A person who never made a mistake never tried anything new”")
    setQuoteBook(newQuoteBook);
  }, []);

  useEffect(() => {
    const randomQIndex = Math.floor(Math.random() * quoteBook.length);
    setQuote(quoteBook[randomQIndex]);
  }, [quoteBook]);

  //example videos (These can't aren't truly deleted but blacklisted in local storage)
  const loadDefaultCassettes = (newLibrary: Cassette[]): Cassette[] => {
    const blacklist: string[] = localStorage.getItem("blacklist") ? JSON.parse(localStorage.getItem("blacklist")!) : null;
    if (!blacklist?.some(name => name === "frogy")) { newLibrary.push({ name: "frogy", source: "https://www.youtube.com/embed/52FljdTl2_M?si=LiZyMDhhxgWG55Ul", video_id: "52FljdTl2_M" }) };
    if (!blacklist?.some(name => name === "lofi girl")) { newLibrary.push({ name: "lofi girl", source: "https://www.youtube.com/embed/jfKfPfyJRdk?si=wNwSN9cngcAIGomi", video_id: "jfKfPfyJRdk" }) };
    if (!blacklist?.some(name => name === "relax")) { newLibrary.push({ name: "relax", source: "https://www.youtube.com/embed/851FQiikDaw?si=M6O6JksolCvMFyvS", video_id: "851FQiikDaw" }) };
    if (!blacklist?.some(name => name === "neo jazz")) { newLibrary.push({ name: "neo jazz", source: "https://www.youtube.com/embed/CE8mevzFwO0?si=vL1j-eVdpRerRUnX", video_id: "CE8mevzFwO0" }) };
    if (!blacklist?.some(name => name === "rainy cafe")) { newLibrary.push({ name: "rainy cafe", source: "https://www.youtube.com/embed/NJuSStkIZBg?si=V7NWkkCDeNdmTAOO", video_id: "NJuSStkIZBg" }) };
    if (!blacklist?.some(name => name === "weeds")) { newLibrary.push({ name: "weeds", source: "https://www.youtube.com/embed/_yJu15Qq3To?si=Ka9j5Ry-q_4CCpk3", video_id: "_yJu15Qq3To" }) };
    return newLibrary;
  }

  const handleSlideClick = (cassette: Cassette) => {
    if (mixTapeMode) {
      setMixTapeMode(false);
      setMixedTapeName("");
    }
    setVideoSource(cassette.video_id);
    setCassetteSelectionVisible(false);
    setDisplayImage(`https://img.youtube.com/vi/${cassette.video_id}/maxresdefault.jpg`);
    playTDAudio();
  };

  const handleMixedTapeClick = (mixedTape: mixedTape) => {
    setRecordingMenuVisible(false);
    SetMixTape(mixedTape.tracks);
    setMixedTapeName(mixedTape.name);
    setMixedTapeId(mixedTape.name + mixedTape.tracks.length);

    if (!mixTapeMode) {
      setMixTapeMode(true);
    } 

    setTapeEjected(false);
    setCassetteSelectionVisible(false);
    setDisplayImage(imagePaths.defaultTape);
    playTDAudio();
  };

  const playTDAudio = () => {
    if (tapeDeckAudioRef.current) {
      tapeDeckAudioRef.current.play();
    }
  };

  const onPlayerReady = (event: { target: any; }) => {
    const player = event.target;
    setPlayer(player);
    player.playVideo();
  };

  const onPlay = () => {
    setTapeEjected(false);
    setCassetteSelectionVisible(false);
  }

  const onPause = () => {
    setTapeEjected(true);
    setCassetteSelectionVisible(true);
  }

  const handleEject = () => {

    setCassetteSelectionVisible(!cassetteSelectionVisible);
    if (mixTapeMode) {

    } else {
      if (videoSource != "") {
        if (tapeEjected && player) {
          player.playVideo();
        } else if (!tapeEjected && player) {
          player.pauseVideo();
        }
      }
    }
    setTapeEjected(!tapeEjected);
  }

  const handleVisuals = async () => {
    setVisualsMenuVisible(!visualsMenuVisible);
  }

  const handleSFX = () => {
    setSoundEffectsMenuVisible(!soundEffectsMenuVisible);
  }

  const handleImp = () => {
    setimportMenuVisible(!importMenuVisible);
  }

  const handleExtra = () => {
    setRecordingMenuVisible(!recordingMenuVisible);
    if (mixTapeMode) {
      setMixTapeMode(false);
    }
  }

  const handleExportMixedTape = (mixedTape: mixedTape) => {
    const newMixedTapeLibrary: mixedTape[] = [...mixedTapeLibrary, mixedTape];
    setRecordingMenuVisible(false);
    setMixedTapeLibrary(newMixedTapeLibrary);
    
    if (localStorage.getItem("mixedTapes")) {
      const oldMixedTape = JSON.parse(localStorage.getItem("mixedTapes")!);
      const updatedMixedTapes = [...oldMixedTape, mixedTape];
      localStorage.setItem("mixedTapes", JSON.stringify(updatedMixedTapes));
    } else {
      const mixedTapes: mixedTape[] = [mixedTape];
      localStorage.setItem("mixedTapes", JSON.stringify(mixedTapes));
    }
  }

  const getTimeCode = (): string => {
    if (player && player.getCurrentTime) {
      const currentTime = player.getCurrentTime();
      return currentTime.toFixed(2) + " seconds";
    }
    return "N/A";
  }

  const importVideo = (videoID: string) => {
    let newLibrary: Cassette[] = [];
    newLibrary.push(...cassetteLibrary);
    const newCassette: Cassette = { name: "custom", source: `https://www.youtube.com/embed/${videoID}`, video_id: videoID };
    newLibrary.push(newCassette);
    setCassetteLibrary(newLibrary);
    if (localStorage.getItem("importedLinks")) {
      const oldImportedLinks = JSON.parse(localStorage.getItem("importedLinks")!);
      const updatedImportedLinks = [...oldImportedLinks, newCassette];
      localStorage.setItem("importedLinks", JSON.stringify(updatedImportedLinks));
    } else {
      const importedLinks: Cassette[] = [newCassette];
      localStorage.setItem("importedLinks", JSON.stringify(importedLinks));
    }
    handleSlideClick(newCassette);
    setTapeEjected(true);
  }


  const deleteVideo = (videoID: string) => {
    const cassetteToDelete: Cassette | undefined = cassetteLibrary.find((cassette: Cassette) => cassette.video_id === videoID);
    const defaultNames: string[] = ["frogy", "90s", "lofi girl", "relax", "neo jazz", "rainy cafe", "weeds"];
    if (cassetteToDelete) {

      //delete from local storage
      if (localStorage.getItem("importedLinks")) {
        const oldImportedLinks: Cassette[] = JSON.parse(localStorage.getItem("importedLinks")!);
        const updatedLinks = oldImportedLinks.filter((cassette: Cassette) => cassette.video_id !== cassetteToDelete.video_id);
        if (updatedLinks) {
          localStorage.setItem("importedLinks", JSON.stringify(updatedLinks));
        }
      }

      //add default cassettes to blacklist
      if (defaultNames.some((name: string) => name === cassetteToDelete.name)) {
        if (localStorage.getItem("blacklist")) {
          const currentValues: string[] = JSON.parse(localStorage.getItem("blacklist")!);
          localStorage.setItem("blacklist", JSON.stringify([...currentValues, cassetteToDelete.name]));
        } else {
          localStorage.setItem("blacklist", JSON.stringify([cassetteToDelete.name]));
        }
      }

      //delete from current render
      const updatedLibrary = cassetteLibrary.filter((cassete: Cassette) => cassete !== cassetteToDelete);
      setCassetteLibrary(updatedLibrary);
    }

    setVideoSource("");
    setDisplayImage(imagePaths.defaultTape);
    setTapeEjected(true);
    setCassetteSelectionVisible(true);
  };

  const handlePlayMixTape = (mixTape: track[]) => {
    if (!tapeEjected) {
      handleEject();
    }
    SetMixTape(mixTape);
    setMixTapeMode(!mixTapeMode);
  }

  const options = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };


  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <audio preload="auto" ref={tapeDeckAudioRef}>
          <source src={soundPaths.tapeDeck} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <p className='quote'>
          {quote}
        </p>
      </header>
      <div className="app-body" style={{ backgroundImage: backgroundDisplay ? `url(${displayImage})` : "none" }}>
        <div className='flex-container'>
          <div className='flex-column-left'>
            <div className='sound-console-wrapper'>
              {soundEffectsMenuVisible ? <SoundConsole onGlobalMute={() => setSoundEffectsMuted(!soundEffectsMuted)} globalMuted={soundEffectsMuted} /> : <></>}
            </div>
          </div>

          <div className='canvas'>
            <div className='cassetteCarousel'>
              {cassetteSelectionVisible ? <CassetteCarousel onSlideClick={handleSlideClick} onMixTapeClick={handleMixedTapeClick} cassettes={cassetteLibrary} mixedTapes={mixedTapeLibrary} /> : <></>}
            </div>
            <div className={cassetteSelectionVisible ? 'iframe-container frame-down' : "iframe-container frame-up"}>
              {mixTapeMode ?
                <>{mixTape ? <MixTapePlayer key={mixedTapeId} tracks={mixTape} tapePlaying={tapeEjected} /> : <></>}</> : <>
                  {videoSource != "" ?
                    <YouTube videoId={videoSource} opts={options} onPlay={onPlay} onReady={onPlayerReady} onPause={onPause} className='video' style={playerMinimized ? { opacity: "0%" } : {}} /> :
                    <></>
                  }
                </>
              }

            </div>
          </div>

          <div className='flex-column-right'>
            <div className='tape-player-wrapper' style={playerMinimized ? tapeEjected ? {} : { opacity: "30%", transition: "2s" } : {}}>
              <TapePlayer onEjectButton={handleEject} onSFX_Button={handleSFX} onVis_Button={handleVisuals} onImp_Button={handleImp} onExt_Button={handleExtra} coverID={displayImage} tapeEjected={tapeEjected} displayLabels={labelsDisplayed} recordingConsoleOpen={recordingMenuVisible} mixTapeMode={mixTapeMode} mixTapeName={mixedTapeName}/>
            </div>
          </div>
        </div>
      </div>
      {importMenuVisible ?
        <div>
          <div className='import-console-wrapper'>
            <ImportConsole onImport={importVideo} deleteCassette={() => setDeleteModalOpen(true)} />
          </div>
        </div>
        : <></>}
      {visualsMenuVisible ?
        <div>
          <div className='visuals-console-wrapper'>
            <VisualsConsole toggleBackGround={() => setBackgroundDisplay(!backgroundDisplay)} toggleMinimized={() => setPlayerMinimized(!playerMinimized)} toggleLabels={() => { setLabelsDisplayed(!labelsDisplayed) }} backGroundState={backgroundDisplay} minimizedState={playerMinimized} labelsState={labelsDisplayed} />
          </div>
        </div>
        : <></>}
      <DeleteCassetteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onDelete={() => deleteVideo(videoSource)} />

      {recordingMenuVisible ?
        <div className='recorderConsoleWrapper'>
          <RecorderConsole getTimeCode={getTimeCode} playMixTape={handlePlayMixTape} exportMixTape={handleExportMixedTape} coverSrc={imagePaths.defaultTape} videoSrc={videoSource} mixTapeMode={mixTapeMode} tapeEjected={tapeEjected} />
        </div>
        : <></>
      }
    </div>
  );
}

export default App;


