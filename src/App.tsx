import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.png';
import './App.css';
import CassetteCarousel from './Components/CassetteCarousel';
import TapePlayer from './Components/TapePlayer';
import YouTube from "react-youtube";
import SoundConsole from './Components/SoundConsole';
import VisualsConsole from './Components/VisualsConsole';
import ImportConsole from './Components/ImportConsole';

export interface Cassette {
  name: string,
  source: string,
  video_id: string
}

enum soundPaths {
  "tapeDeck" = "https://docs.google.com/uc?export=download&id=1XtWv60ze6CtM-geWnYHf3owgZ21URd4H",
}

const defaultTapeImg: string = "https://drive.google.com/uc?export=view&id=1IN3YLXurbF-5p_mzRuzU7PbKY8Uesogs";


function App() {
  const [videoSource, setVideoSource] = useState<string>("52FljdTl2_M");
  const [displayImage, setDisplayImage] = useState<string>(defaultTapeImg);
  const [cassetteLibrary, setCassetteLibrary] = useState<Cassette[]>([]);
  const [quoteBook, setQuoteBook] = useState<string[]>([]);
  const [quote, setQuote] = useState<string>("");
  const [cassetteSelectionVisible, setCassetteSelectionVisible] = useState<boolean>(false);
  const [soundEffectsMenuVisible, setSoundEffectsMenuVisible] = useState<boolean>(false);
  const [importMenuVisible, setimportMenuVisible] = useState<boolean>(false);
  const [visualsMenuVisible, setVisualsMenuVisible] = useState<boolean>(false);
  const [tapeEjected, setTapeEjected] = useState<boolean>(false);
  const [player, setPlayer] = useState<any>(null);
  const [soundEffectsMuted, setSoundEffectsMuted] = useState<boolean>(false);
  const [playerMinimized, setPlayerMinimized] = useState<boolean>(false);
  const tapeDeckAudioRef = useRef<HTMLAudioElement | null>(null);

  //display options
  const [backgroundDisplay, setBackgroundDisplay] = useState<boolean>(false);


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
    if (!blacklist?.some(name => name === "90s")) { newLibrary.push({ name: "90s", source: "https://www.youtube.com/embed/GabqgJEeigs?si=_nX614lTGDLrBRbF", video_id: "GabqgJEeigs" }) };
    if (!blacklist?.some(name => name === "lofi girl")) { newLibrary.push({ name: "lofi girl", source: "https://www.youtube.com/embed/jfKfPfyJRdk?si=wNwSN9cngcAIGomi", video_id: "jfKfPfyJRdk" }) };
    if (!blacklist?.some(name => name === "relax")) { newLibrary.push({ name: "relax", source: "https://www.youtube.com/embed/851FQiikDaw?si=M6O6JksolCvMFyvS", video_id: "851FQiikDaw" }) };
    if (!blacklist?.some(name => name === "neo jazz")) { newLibrary.push({ name: "neo jazz", source: "https://www.youtube.com/embed/CE8mevzFwO0?si=vL1j-eVdpRerRUnX", video_id: "CE8mevzFwO0" }) };
    if (!blacklist?.some(name => name === "rainy cafe")) { newLibrary.push({ name: "rainy cafe", source: "https://www.youtube.com/embed/NJuSStkIZBg?si=V7NWkkCDeNdmTAOO", video_id: "NJuSStkIZBg" }) };
    if (!blacklist?.some(name => name === "weeds")) { newLibrary.push({ name: "weeds", source: "https://www.youtube.com/embed/_yJu15Qq3To?si=Ka9j5Ry-q_4CCpk3", video_id: "_yJu15Qq3To" }) };
    return newLibrary;
  }

  const handleSlideClick = (cassette: Cassette) => {
    setVideoSource(cassette.video_id);
    setCassetteSelectionVisible(false);
    setDisplayImage(`https://img.youtube.com/vi/${cassette.video_id}/maxresdefault.jpg`);
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
    if (videoSource != "") {
      if (tapeEjected && player) {
        player.playVideo();
      } else if (!tapeEjected && player) {
        player.pauseVideo();
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
    setDisplayImage(defaultTapeImg);
    setTapeEjected(true);
    setCassetteSelectionVisible(true);
  };

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
              {cassetteSelectionVisible ? <CassetteCarousel cassettes={cassetteLibrary} onSlideClick={handleSlideClick} /> : <></>}
            </div>
            <div className={cassetteSelectionVisible ? 'iframe-container frame-down' : "iframe-container frame-up"}>
              {videoSource != "" ?
                <YouTube videoId={videoSource} opts={options} onPlay={onPlay} onReady={onPlayerReady} onPause={onPause} className='video' style={playerMinimized?{opacity:"0%"}:{}}/> :
                <></>
              }
            </div>
          </div>

          <div className='flex-column-right'>
            <div className='tape-player-wrapper' style={playerMinimized?tapeEjected?{}:{opacity:"30%", transition: "2s"}:{}}>
              <TapePlayer onEjectButton={handleEject} onSFX_Button={handleSFX} onVis_Button={handleVisuals} onImp_Button={handleImp} onExt_Button={() => deleteVideo(videoSource)} coverID={displayImage} tapeEjected={tapeEjected}/>
            </div>
          </div>
        </div>
      </div>
      {importMenuVisible ?
        <div>
          <div className='import-console-wrapper'>
            <ImportConsole onImport={importVideo} />
          </div>
        </div>
        : <></>}
      {visualsMenuVisible ?
        <div>
          <div className='visuals-console-wrapper'>
            <VisualsConsole toggleBackGround={() => setBackgroundDisplay(!backgroundDisplay)} toggleMinimized={() => setPlayerMinimized(!playerMinimized)} backGroundState={backgroundDisplay} minimizedState={playerMinimized}/>
          </div>
        </div>
        : <></>}
    </div>
  );
}

export default App;


