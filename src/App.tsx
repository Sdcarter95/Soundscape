import React from 'react';
import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='Quote'>
          “Opportunities don't happen, you create them."
        </p>
      </header>

      <iframe className='Frame' width="560" height="315" src="https://www.youtube.com/embed/52FljdTl2_M?si=LiZyMDhhxgWG55Ul" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  );
}

export default App;
