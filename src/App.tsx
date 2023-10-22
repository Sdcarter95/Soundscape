import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import './App.css';
import CassetteCarousel from './Components/CassetteCarousel';

export interface Cassette {
  name: string,
  source: string,
  video_id: string
}

function App() {
  const [videoSource, setVideoSource] = useState<string>("https://www.youtube.com/embed/52FljdTl2_M?si=LiZyMDhhxgWG55Ul");
  const [cassetteLibrary, setCassetteLibrary] = useState<Cassette[]>([]);
  
  useEffect(() => {
    let newLibrary: Cassette[] = [];
    newLibrary.push({name: "frogy", source: "https://www.youtube.com/embed/52FljdTl2_M?si=LiZyMDhhxgWG55Ul", video_id: "52FljdTl2_M"});
    newLibrary.push({name: "90s", source: "https://www.youtube.com/embed/GabqgJEeigs?si=_nX614lTGDLrBRbF", video_id: "GabqgJEeigs"});
    newLibrary.push({name: "lofi girl", source: "https://www.youtube.com/embed/jfKfPfyJRdk?si=wNwSN9cngcAIGomi", video_id: "jfKfPfyJRdk"});
    newLibrary.push({name: "relax", source: "https://www.youtube.com/embed/851FQiikDaw?si=M6O6JksolCvMFyvS", video_id: "851FQiikDaw"});
    newLibrary.push({name: "neo jazz", source: "https://www.youtube.com/embed/CE8mevzFwO0?si=vL1j-eVdpRerRUnX", video_id: "CE8mevzFwO0"});
    newLibrary.push({name: "rainy cafe", source: "https://www.youtube.com/embed/NJuSStkIZBg?si=V7NWkkCDeNdmTAOO", video_id: "NJuSStkIZBg"});
    newLibrary.push({name: "weeds", source: "https://www.youtube.com/embed/_yJu15Qq3To?si=Ka9j5Ry-q_4CCpk3", video_id: "_yJu15Qq3To"});
    setCassetteLibrary(newLibrary);
  }, [])

  const handleSlideClick = (cassette: Cassette) => {
    setVideoSource(cassette.source);
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='Quote'>
          “Opportunities don't happen, you create them."
        </p>
      </header>
      <CassetteCarousel cassettes={cassetteLibrary} onSlideClick = {handleSlideClick}/>
      <iframe className='Frame' width="560" height="315" src={videoSource} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  );
}

export default App;


