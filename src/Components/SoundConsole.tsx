import { useEffect, useState } from "react";
import "./css/SoundConsole.css"
import { Howl, Howler } from 'howler';

enum soundPaths {
    rain = "https://audio.jukehost.co.uk/TvTHAG7RVMB7eDb68O6Vmv4hKaBy6EkI",
    fireplace = "https://audio.jukehost.co.uk/g0EDzD4kBGW8hB5Ahta27C6u6wtxHjj4",
    train = "https://audio.jukehost.co.uk/GYo9wmXUMa3lAmznxmwXCXocACFMPs8t",
}

const rain_sound = new Howl({
    src: [soundPaths.rain],
    html5: true,
    loop: true,
});

const fire_sound = new Howl({
    src: [soundPaths.fireplace],
    html5: true,
    loop: true,
});

const train_sound = new Howl({
    src: [soundPaths.train],
    html5: true,
    loop: true,
});

interface SoundConsoleProps {

}

const SoundConsole: React.FC<SoundConsoleProps> = () => {
    const [masterVolume, setMasterVolume] = useState(100);
    const [rainVolume, setRainVolume] = useState(100);
    const [fireVolume, setFireVolume] = useState(100);
    const [trainVolume, setTrainVolume] = useState(100);

    useEffect(() => {
        setMasterVolume(Howler.volume() * 100);
        setRainVolume(rain_sound.volume() * 100);
        setFireVolume(rain_sound.volume() * 100);
        setTrainVolume(rain_sound.volume() * 100);
    }, []);


    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>, sound: Howl|HowlerGlobal, setVolume: (volume: number) => void) => {
        const newVolume = parseInt(event.target.value, 10);
        setVolume(newVolume);
        sound.volume(newVolume / 100);
    };


    const handlePlayToggle = (sound: Howl) => {
        if (sound.playing()) {
            sound.pause();
        } else {
            sound.play();
        }
    };



    return (
        <div className="console">
            <h1>Sound Effect Control</h1>
            <input
                type="range"
                min="0"
                max="100"
                value={masterVolume}
                onChange={(e) => handleVolumeChange(e, Howler, setMasterVolume)}
            />
            <br />
            <input
                type="range"
                min="0"
                max="100"
                value={rainVolume}
                onChange={(e) => handleVolumeChange(e, rain_sound, setRainVolume)}
            />
            <button onClick={()=>handlePlayToggle(rain_sound)}>Rain</button>
            <br />

            <input
                type="range"
                min="0"
                max="100"
                value={fireVolume}
                onChange={(e) => handleVolumeChange(e, fire_sound, setFireVolume)}
            />
            <button onClick={()=>handlePlayToggle(fire_sound)}>Fire</button>
            <br />

            <input
                type="range"
                min="0"
                max="100"
                value={trainVolume}
                onChange={(e) => handleVolumeChange(e, train_sound, setTrainVolume)}
            />
            <button onClick={()=>handlePlayToggle(train_sound)}>Train</button>
            <br />
        
        </div>
    );
}

export default SoundConsole;