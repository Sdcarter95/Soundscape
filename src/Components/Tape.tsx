import "./css/Tape.css";

enum imagePaths {
    tape = "https://drive.google.com/uc?export=view&id=1fsfZUvL2C0Djd7djBBvsEwAE_KkWoFL6",
}

interface TapeProps {
    coverArt: string;
  }
const Tape:React.FC<TapeProps> = ({coverArt}) =>  {


    return (
        <div>
            <img className='tape' src={imagePaths.tape}></img>
            <img className='tape cover-art' style={{width:"93%", left:"4vh"}} src={coverArt}></img>
        </div>
    );
}

export default Tape;
