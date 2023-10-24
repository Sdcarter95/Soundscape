import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.png';
import './App.css';
import CassetteCarousel from './Components/CassetteCarousel';

export interface Cassette {
  name: string,
  source: string,
  video_id: string
}

enum imagePaths {
  ejectUnpressed = "https://drive.google.com/uc?export=view&id=1n6FUlwQtS2aVzsd7lX6YhYU4KIZlxJnR",
  ejectPressed = "https://drive.google.com/uc?export=view&id=1Lxp6bo_3TO5vhukXtVKclaWmi2pi3RpH",
  soundsUnpressed = "https://drive.google.com/uc?export=view&id=1LStluy0ZW_FHSu5XpAHcQ8N1Pg16PRg9",
  soundsPressed = "https://drive.google.com/uc?export=view&id=18vjz47BbB22eXA5UsUBPFfJJ-HSy0UCR",
  visualsUnpressed = "https://drive.google.com/uc?export=view&id=1eAuK_BVc-AWgX7LB4YNouP-w27DaXXi4",
  visualsPressed = "https://drive.google.com/uc?export=view&id=1GMLONSeKUsMWHjCI3prY_1Xd7fYNdYR9"
}

enum soundPaths {
  "switchPressed" = "https://docs.google.com/uc?export=download&id=1gedh2zkeYRfhKhUn61-rhphU_bEEKKQp",
  "tapeDeck" = "https://docs.google.com/uc?export=download&id=1XtWv60ze6CtM-geWnYHf3owgZ21URd4H"
}

function App() {
  const [videoSource, setVideoSource] = useState<string>("https://www.youtube.com/embed/851FQiikDaw?si=M6O6JksolCvMFyvS");
  const [displayImage, setDisplayImage] = useState<string>();
  const [cassetteLibrary, setCassetteLibrary] = useState<Cassette[]>([]);
  const [quoteBook, setQuoteBook] = useState<string[]>([]);
  const [quote, setQuote] = useState<string>("");
  const [cassetteSelectionVisible, setCassetteSelectionVisible] = useState<boolean>(false);
  const [ejectImageSrc, setEjectImageSrc] = useState<string>();
  const [soundsImageSrc, setSoundsImageSrc] = useState<string>(imagePaths.soundsUnpressed);
  const [visualsImageSrc, setVisualsImageSrc] = useState<string>(imagePaths.visualsUnpressed);
  const [preloadedImages, setPreloadedImages] = useState<{ [key: string]: HTMLImageElement }>({});
  const tapeDeckAudioRef = useRef<HTMLAudioElement | null>(null);
  const switchAudioRef = useRef<HTMLAudioElement | null>(null);


  useEffect(() => {
    let newLibrary: Cassette[] = [];
    newLibrary.push({ name: "frogy", source: "https://www.youtube.com/embed/52FljdTl2_M?si=LiZyMDhhxgWG55Ul", video_id: "52FljdTl2_M" });
    newLibrary.push({ name: "90s", source: "https://www.youtube.com/embed/GabqgJEeigs?si=_nX614lTGDLrBRbF", video_id: "GabqgJEeigs" });
    newLibrary.push({ name: "lofi girl", source: "https://www.youtube.com/embed/jfKfPfyJRdk?si=wNwSN9cngcAIGomi", video_id: "jfKfPfyJRdk" });
    newLibrary.push({ name: "relax", source: "https://www.youtube.com/embed/851FQiikDaw?si=M6O6JksolCvMFyvS", video_id: "851FQiikDaw" });
    newLibrary.push({ name: "neo jazz", source: "https://www.youtube.com/embed/CE8mevzFwO0?si=vL1j-eVdpRerRUnX", video_id: "CE8mevzFwO0" });
    newLibrary.push({ name: "rainy cafe", source: "https://www.youtube.com/embed/NJuSStkIZBg?si=V7NWkkCDeNdmTAOO", video_id: "NJuSStkIZBg" });
    newLibrary.push({ name: "weeds", source: "https://www.youtube.com/embed/_yJu15Qq3To?si=Ka9j5Ry-q_4CCpk3", video_id: "_yJu15Qq3To" });
    setCassetteLibrary(newLibrary);
    let newQuoteBook: string[] = [];
    newQuoteBook.push(`“Opportunities don't happen, you create them.”`);
    newQuoteBook.push(`“One sees in the world what they carry in their heart”`);
    newQuoteBook.push("“Doubt kills more dreams than failure ever will”");
    newQuoteBook.push("“A person who never made a mistake never tried anything new”")
    preloadImages(imagePaths)
    setQuoteBook(newQuoteBook);
  }, []);

  useEffect(() => {
    const randomQIndex = Math.floor(Math.random() * quoteBook.length);
    setQuote(quoteBook[randomQIndex]);
  }, [quoteBook]);

  useEffect(() => {
    if (ejectImageSrc === imagePaths.ejectUnpressed) {
      setEjectImageSrc(imagePaths.ejectPressed);
    } else {
      setEjectImageSrc(imagePaths.ejectUnpressed);
    }
    playOtherAudio();
  }, [cassetteSelectionVisible])



  const handleSlideClick = (cassette: Cassette) => {
    setVideoSource(cassette.source);
    //setDisplayImage(`https://img.youtube.com/vi/${cassette.video_id}/maxresdefault.jpg`);
    playAudio();
  };

  const handleSoundsButton = () => {
    if (soundsImageSrc === preloadedImages[imagePaths.soundsUnpressed]?.src) {
      setSoundsImageSrc(preloadedImages[imagePaths.soundsPressed]?.src);
    } else {
      setSoundsImageSrc(preloadedImages[imagePaths.soundsUnpressed]?.src);
    }
    playOtherAudio();
  }

  const handleVisualsButton = () => {
    if (visualsImageSrc === imagePaths.visualsUnpressed) {
      setVisualsImageSrc(imagePaths.visualsPressed);
    } else {
      setVisualsImageSrc(imagePaths.visualsUnpressed);
    }
    playOtherAudio();
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


  const playAudio = () => {
    if (tapeDeckAudioRef.current) {
      tapeDeckAudioRef.current.play();
    }
  };

  const playOtherAudio = () => {
    if (switchAudioRef.current) {
      switchAudioRef.current.play();
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <audio preload="auto" ref={tapeDeckAudioRef}>
          <source src={soundPaths.tapeDeck} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <audio preload="auto" ref={switchAudioRef}>
          <source src={soundPaths.switchPressed} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <p className='Quote'>
          {quote}
        </p>
      </header>
      <div className="App-body" style={{ backgroundImage: `url(${displayImage})` }}>
        <div className='flex-container'>
          <div className='flex-item'>
          </div>
          <div className='flex-item'>
            <div className='CassettePlayer'>
              {cassetteSelectionVisible ? <CassetteCarousel cassettes={cassetteLibrary} onSlideClick={handleSlideClick} /> : <></>}
              {cassetteSelectionVisible ?
                <iframe className='Frame-Down' width="560" height="315" src={videoSource + "?autoplay=1"} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                : <iframe className='Frame-Up' width="560" height="315" src={videoSource + "?autoplay=1"} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              }
              <div className='ButtonBar'>
                <img className='EjectButton' src={ejectImageSrc} onClick={() => setCassetteSelectionVisible(!cassetteSelectionVisible)}></img>
                <img className='SoundsButton' src={soundsImageSrc} onClick={() => handleSoundsButton()}></img>
                <img className='VisualsButton' src={visualsImageSrc} onClick={() => handleVisualsButton()}></img>
              </div>
            </div>
          </div>
          <div className='flex-item'>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


