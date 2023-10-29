import { useEffect, useState } from "react";
import "./css/SoundConsole.css"
import { Howl, Howler } from 'howler';

enum soundPaths {
    rain = "https://audio.jukehost.co.uk/LhQ94g6eqzTWy0XNbQw8AreyjBBFBE7u",
    fireplace = "https://audio.jukehost.co.uk/g0EDzD4kBGW8hB5Ahta27C6u6wtxHjj4",
    train = "https://audio.jukehost.co.uk/GYo9wmXUMa3lAmznxmwXCXocACFMPs8t",
    thunder = "https://audio.jukehost.co.uk/3tV2ldXyZYMpQm5qbaHr6Rb5voqLSrpy",
    people = "https://audio.jukehost.co.uk/Ik4SzYSb0H1gzJgdKUnvDeBQrcLJ67uS",
    forest = "https://audio.jukehost.co.uk/w0RARpPjY4M185YVTPoZ60Pghtvgyah7",
    ocean = "https://audio.jukehost.co.uk/HKpRDzsngOkKXxQSfkNHVPScUn6YcEpR",
    night = "https://audio.jukehost.co.uk/uc3JQyL6v6h5bEMA05wQKTW8MYQzBo7T",
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

const thunder_sound = new Howl({
    src: [soundPaths.thunder],
    html5: true,
    loop: true,
});

const people_sound = new Howl({
    src: [soundPaths.people],
    html5: true,
    loop: true,
});

const forest_sound = new Howl({
    src: [soundPaths.forest],
    html5: true,
    loop: true,
});

const ocean_sound = new Howl({
    src: [soundPaths.ocean],
    html5: true,
    loop: true,
});

const night_sound = new Howl({
    src: [soundPaths.night],
    html5: true,
    loop: true,
});


interface SoundConsoleProps {
    onGlobalMute: () => void,
    globalMuted: boolean,
}

const SoundConsole: React.FC<SoundConsoleProps> = ({onGlobalMute, globalMuted}) => {
    const [masterVolume, setMasterVolume] = useState<number>(100);
    const [rainVolume, setRainVolume] = useState<number>(100);
    const [fireVolume, setFireVolume] = useState<number>(100);
    const [trainVolume, setTrainVolume] = useState<number>(100);
    const [thunderVolume, setThunderVolume] = useState<number>(100);
    const [peopleVolume, setPeopleVolume] = useState<number>(100);
    const [forestVolume, setForestVolume] = useState<number>(100);
    const [oceanVolume, setOceanVolume] = useState<number>(100);
    const [nightVolume, setNightVolume] = useState<number>(100);
    const [rainPressed, setRainPressed] = useState<boolean>(rain_sound.playing());
    const [firePressed, setFirePressed] = useState<boolean>(fire_sound.playing());
    const [trainPressed, setTrainPressed] = useState<boolean>(train_sound.playing());
    const [thunderPressed, setThunderPressed] = useState<boolean>(thunder_sound.playing());
    const [peoplePressed, setPeoplePressed] = useState<boolean>(people_sound.playing());
    const [forestPressed, setForestPressed] = useState<boolean>(forest_sound.playing());
    const [oceanPressed, setOceanPressed] = useState<boolean>(ocean_sound.playing());
    const [nightPressed, setNightPressed] = useState<boolean>(night_sound.playing());
    const [muted, setMuted] = useState<boolean>(globalMuted);

    useEffect(() => {
        setMasterVolume(Howler.volume() * 100);
        setRainVolume(rain_sound.volume() * 100);
        setFireVolume(fire_sound.volume() * 100);
        setTrainVolume(train_sound.volume() * 100);
        setThunderVolume(thunder_sound.volume() * 100);
        setPeopleVolume(people_sound.volume() * 100);
        setForestVolume(forest_sound.volume() * 100);
        setOceanVolume(ocean_sound.volume() * 100);
        setNightVolume(night_sound.volume() * 100);
    }, []);


    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>, sound: Howl | HowlerGlobal, setVolume: (volume: number) => void) => {
        const newVolume = parseInt(event.target.value, 10);
        setVolume(newVolume);
        sound.volume(newVolume / 100);
    };


    const handlePlayToggle = (sound: Howl | HowlerGlobal) => {
        if (sound instanceof Howl) {
            if (sound.playing()) {
                sound.pause();
            } else {
                sound.play();
            }
        } else{
            if(muted){
                sound.mute(false);
                setMuted(false);
            } else {
                sound.mute(true);
                setMuted(true);
            }
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
                style={muted?{opacity:"30%"}:{}}
                className="slider master-slider"
            />
            <button onClick={() => {handlePlayToggle(Howler); onGlobalMute()}}>All</button>
            <br />
            <input
                type="range"
                min="0"
                max="100"
                value={rainVolume}
                onChange={(e) => handleVolumeChange(e, rain_sound, setRainVolume)}
                style={muted?{opacity:"30%"}:rainPressed?{}:{opacity:"30%"}}
                className="slider"
            />
            <button onClick={() => {handlePlayToggle(rain_sound);setRainPressed(!rainPressed)}}>Rain</button>
            <br />

            <input
                type="range"
                min="0"
                max="100"
                value={thunderVolume}
                onChange={(e) => handleVolumeChange(e, thunder_sound, setThunderVolume)}
                style={muted?{opacity:"30%"}:thunderPressed?{}:{opacity:"30%"}}
                className="slider"
            />
            <button onClick={() => {handlePlayToggle(thunder_sound);setThunderPressed(!thunderPressed)}}>Thunder</button>
            <br />

            <input
                type="range"
                min="0"
                max="100"
                value={fireVolume}
                onChange={(e) => handleVolumeChange(e, fire_sound, setFireVolume)}
                style={muted?{opacity:"30%"}:firePressed?{}:{opacity:"30%"}}
                className="slider"
            />
            <button onClick={() => {handlePlayToggle(fire_sound);setFirePressed(!firePressed)}}>Fire</button>
            <br />

            <input
                type="range"
                min="0"
                max="100"
                value={trainVolume}
                onChange={(e) => handleVolumeChange(e, train_sound, setTrainVolume)}
                style={muted?{opacity:"30%"}:trainPressed?{}:{opacity:"30%"}}
                className="slider"
            />
            <button onClick={() => {handlePlayToggle(train_sound);setTrainPressed(!trainPressed)}}>Train</button>
            <br />

            <input
                type="range"
                min="0"
                max="100"
                value={peopleVolume}
                onChange={(e) => handleVolumeChange(e, people_sound, setPeopleVolume)}
                style={muted?{opacity:"30%"}:peoplePressed?{}:{opacity:"30%"}}
                className="slider"
            />
            <button onClick={() => {handlePlayToggle(people_sound);setPeoplePressed(!peoplePressed)}}>People</button>
            <br />

            <input
                type="range"
                min="0"
                max="100"
                value={forestVolume}
                onChange={(e) => handleVolumeChange(e, forest_sound, setForestVolume)}
                style={muted?{opacity:"30%"}:forestPressed?{}:{opacity:"30%"}}
                className="slider"
            />
            <button onClick={() => {handlePlayToggle(forest_sound);setForestPressed(!forestPressed)}}>Forest</button>
            <br />

            <input
                type="range"
                min="0"
                max="100"
                value={oceanVolume}
                onChange={(e) => handleVolumeChange(e, ocean_sound, setOceanVolume)}
                style={muted?{opacity:"30%"}:oceanPressed?{}:{opacity:"30%"}}
                className="slider"
            />
            <button onClick={() => {handlePlayToggle(ocean_sound);setOceanPressed(!oceanPressed)}}>Ocean</button>
            <br />

            <input
                type="range"
                min="0"
                max="100"
                value={nightVolume}
                onChange={(e) => handleVolumeChange(e, night_sound, setNightVolume)}
                style={muted?{opacity:"30%"}:nightPressed?{}:{opacity:"30%"}}
                className="slider"
            />
            <button onClick={() => {handlePlayToggle(night_sound);setNightPressed(!nightPressed)}}>Night</button>
            <br />
            <br />

        </div>
    );
}

export default SoundConsole;