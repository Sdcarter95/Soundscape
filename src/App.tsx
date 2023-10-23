import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.png';
import './App.css';
import CassetteCarousel from './Components/CassetteCarousel';

export interface Cassette {
  name: string,
  source: string,
  video_id: string
}

function App() {
  const [videoSource, setVideoSource] = useState<string>("https://www.youtube.com/embed/851FQiikDaw?si=M6O6JksolCvMFyvS");
  const [displayImage, setDisplayImage] = useState<string>("");
  const [cassetteLibrary, setCassetteLibrary] = useState<Cassette[]>([]);
  const [quoteBook, setQuoteBook] = useState<string[]>([]);
  const [quote, setQuote] = useState<string>("");
  const [cassetteSelectionVisible, setCassetteSelectionVisible] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);



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
    setQuoteBook(newQuoteBook);
  }, []);

  useEffect(() => {
    const randomQIndex = Math.floor(Math.random() * quoteBook.length);
    setQuote(quoteBook[randomQIndex]);
  }, [quoteBook]);


  const handleSlideClick = (cassette: Cassette) => {
    setVideoSource(cassette.source);
    //setDisplayImage(`https://img.youtube.com/vi/${cassette.video_id}/maxresdefault.jpg`);
    playAudio();
  };


  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <audio ref={audioRef}>
          <source src={"https://docs.google.com/uc?export=download&id=1XtWv60ze6CtM-geWnYHf3owgZ21URd4H"} type="audio/mpeg" />
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
              {cassetteSelectionVisible ? <CassetteCarousel cassettes={cassetteLibrary} onSlideClick={handleSlideClick} />:<></>}
              {cassetteSelectionVisible ?
                <iframe className='Frame-Down' width="560" height="315" src={videoSource + "?autoplay=1"} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> 
                :<iframe className='Frame-Up' width="560" height="315" src={videoSource + "?autoplay=1"} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> 
              }
              <button className='EjectButton' onClick={() => setCassetteSelectionVisible(!cassetteSelectionVisible)}>Eject</button>
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


