import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.png';
import './App.css';
import CassetteCarousel from './Components/CassetteCarousel';
import TapePlayer from './Components/TapePlayer';
import YouTube from "react-youtube";
import SoundConsole from './Components/SoundConsole';
import ImportConsole from './Components/ImportConsole';

export interface Cassette {
  name: string,
  source: string,
  video_id: string
}


enum soundPaths {
  "tapeDeck" = "https://docs.google.com/uc?export=download&id=1XtWv60ze6CtM-geWnYHf3owgZ21URd4H",
}

function App() {
  const [videoSource, setVideoSource] = useState<string>("52FljdTl2_M");
  const [displayImage, setDisplayImage] = useState<string>("https://drive.google.com/uc?export=view&id=1IN3YLXurbF-5p_mzRuzU7PbKY8Uesogs"); //display image is the background
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
  const tapeDeckAudioRef = useRef<HTMLAudioElement | null>(null);


  useEffect(() => {
    let newLibrary: Cassette[] = [];
    newLibrary.push({ name: "frogy", source: "https://www.youtube.com/embed/52FljdTl2_M?si=LiZyMDhhxgWG55Ul", video_id: "52FljdTl2_M" });
    newLibrary.push({ name: "90s", source: "https://www.youtube.com/embed/GabqgJEeigs?si=_nX614lTGDLrBRbF", video_id: "GabqgJEeigs" });
    newLibrary.push({ name: "lofi girl", source: "https://www.youtube.com/embed/jfKfPfyJRdk?si=wNwSN9cngcAIGomi", video_id: "jfKfPfyJRdk" });
    newLibrary.push({ name: "relax", source: "https://www.youtube.com/embed/851FQiikDaw?si=M6O6JksolCvMFyvS", video_id: "851FQiikDaw" });
    newLibrary.push({ name: "neo jazz", source: "https://www.youtube.com/embed/CE8mevzFwO0?si=vL1j-eVdpRerRUnX", video_id: "CE8mevzFwO0" });
    newLibrary.push({ name: "rainy cafe", source: "https://www.youtube.com/embed/NJuSStkIZBg?si=V7NWkkCDeNdmTAOO", video_id: "NJuSStkIZBg" });
    newLibrary.push({ name: "weeds", source: "https://www.youtube.com/embed/_yJu15Qq3To?si=Ka9j5Ry-q_4CCpk3", video_id: "_yJu15Qq3To" });
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
    if (tapeEjected && player) {
      player.playVideo();
    } else if (!tapeEjected && player) {
      player.pauseVideo();
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
      <div className="app-body" style={{ backgroundImage: visualsMenuVisible ? `url(${displayImage})` : "none" }}>
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
              <YouTube videoId={videoSource} opts={options} onPlay={onPlay} onReady={onPlayerReady} onPause={onPause} className='video' />
            </div>
          </div>

          <div className='flex-column-right'>
            <div className='tape-player-wrapper'>
              <TapePlayer onEjectButton={handleEject} onSFX_Button={handleSFX} onVis_Button={handleVisuals} onImp_Button={handleImp} coverID={displayImage} tapeEjected={tapeEjected} />
            </div>
          </div>
        </div>
      </div>
      {importMenuVisible ?
        <div className='import-console-wrapper'>
          <ImportConsole onImport={importVideo} />
        </div>
        : <></>}
    </div>
  );
}

export default App;


