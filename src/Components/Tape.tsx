import "./css/Tape.css";

enum imagePaths {
    tape = "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQ3rujte1pPgHonF7v-qH_uoTEf4E9uNZ9j_dOSI-CBq4vKEq0FxFOAjYPVm7eWIuXyvj9-aDz1X96aMMmLrmLYwtsXOw=s2560",
}

interface TapeProps {
    coverArt: string;
    mixTapeMode: boolean;
    mixTapeName: string;
  }
const Tape:React.FC<TapeProps> = ({coverArt, mixTapeMode, mixTapeName}) =>  {


    return (
        <div >
            <img className='tape' src={imagePaths.tape}></img>
            <img className='tape cover-art' style={{width:"93%", left:"4vh"}} src={coverArt}></img>
            {mixTapeMode?<p className="mixed-tape-display-text">{mixTapeName}</p>:<></>}
        </div>
    );
}

export default Tape;
