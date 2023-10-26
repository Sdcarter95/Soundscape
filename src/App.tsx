import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.png';
import './App.css';
import CassetteCarousel from './Components/CassetteCarousel';
import TapePlayer from './Components/TapePlayer';

export interface Cassette {
  name: string,
  source: string,
  video_id: string
}



enum soundPaths {
  "tapeDeck" = "https://docs.google.com/uc?export=download&id=1XtWv60ze6CtM-geWnYHf3owgZ21URd4H",
}

function App() {
  const [videoSource, setVideoSource] = useState<string>("https://www.youtube.com/embed/851FQiikDaw?si=M6O6JksolCvMFyvS");
  const [displayImage, setDisplayImage] = useState<string>("https://drive.google.com/uc?export=view&id=1IN3YLXurbF-5p_mzRuzU7PbKY8Uesogs"); //display image is the background
  const [cassetteLibrary, setCassetteLibrary] = useState<Cassette[]>([]);
  const [quoteBook, setQuoteBook] = useState<string[]>([]);
  const [quote, setQuote] = useState<string>("");
  const [cassetteSelectionVisible, setCassetteSelectionVisible] = useState<boolean>(false);
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
    setCassetteLibrary(newLibrary);
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
    setVideoSource(cassette.source);
    setDisplayImage(`https://img.youtube.com/vi/${cassette.video_id}/maxresdefault.jpg`);
    playTDAudio();
  };

  const playTDAudio = () => {
    if (tapeDeckAudioRef.current) {
      tapeDeckAudioRef.current.play();
    }
  };


  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <audio preload="auto" ref={tapeDeckAudioRef}>
          <source src={soundPaths.tapeDeck} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <p className='auote'>
          {quote}
        </p>
      </header>
      <div className="app-body" style={{ /*backgroundImage: `url(${displayImage})`*/ }}>
        <div className='flex-container'>
          <div className='flex-column'>
            <div className='flex-item'></div>
          </div>

          <div className='canvas'>
            <div className='cassetteCarousel'>
              {cassetteSelectionVisible ? <CassetteCarousel cassettes={cassetteLibrary} onSlideClick={handleSlideClick} /> : <></>}
            </div>
            <div className='iframe-container'>
              {cassetteSelectionVisible ?
                <iframe className='frame-down' width="560" height="315" src={videoSource + "?autoplay=1"} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                : <iframe className='frame-up' width="560" height="315" src={videoSource + "?autoplay=1"} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              }
            </div>
          </div>

          <div className='flex-column'>
            <TapePlayer onEjectButton={() => setCassetteSelectionVisible(!cassetteSelectionVisible)} onSFX_Button={() => null} coverID={displayImage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


