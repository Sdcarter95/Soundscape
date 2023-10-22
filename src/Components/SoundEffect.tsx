import React, { useRef } from 'react';

interface AudioPlayerProps {
  mp3Path: string;
}

const SoundEffect: React.FC<AudioPlayerProps> = ({ mp3Path }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div>
      <button onClick={playAudio}>Play</button>
      <audio ref={audioRef}>
        <source src={mp3Path} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default SoundEffect;