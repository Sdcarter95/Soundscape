import { useEffect, useState } from "react";
import "./css/SoundConsole.css"
import { Howl, Howler } from 'howler';

enum soundPaths {
    rain = "https://audio.jukehost.co.uk/TvTHAG7RVMB7eDb68O6Vmv4hKaBy6EkI",
}

const rain_sound = new Howl({
    src: [soundPaths.rain],
    html5: true,
    loop: true,
});

interface SoundConsoleProps {

}

const SoundConsole: React.FC<SoundConsoleProps> = () => {
    const [masterVolume, setMasterVolume] = useState(100);
    const [rainVolume, setRainVolume] = useState(100);

    useEffect(() => {
        setMasterVolume(Howler.volume() * 100);
        setRainVolume(rain_sound.volume() * 100);
    }, []);

    const handleMasterVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseInt(event.target.value, 10);
        setMasterVolume(newVolume);
        Howler.volume(newVolume / 100);
    };

    const handleRainVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseInt(event.target.value, 10);
        setRainVolume(newVolume);
        rain_sound.volume(newVolume / 100);
    };



    const handlePlay = () => {
        if (rain_sound.playing()) {
            rain_sound.pause();
        } else {
            rain_sound.play();
        }
    };


    return (
        <div className="console">
            <h1>Sound Effect Control</h1>
            <input
                type="range"
                min="0"
                max="100"
                value={rainVolume}
                onChange={handleRainVolumeChange}
            />
            <br />
            <input
                type="range"
                min="0"
                max="100"
                value={masterVolume}
                onChange={handleMasterVolumeChange}
            />
            <button onClick={handlePlay}>Rain</button>
            <br />
        </div>
    );
}

export default SoundConsole;