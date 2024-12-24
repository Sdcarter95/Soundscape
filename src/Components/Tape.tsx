import React from "react";
import "./css/Tape.css";
import { MixTapeImagePaths } from "./utils/Constants";

interface TapeProps {
    coverArt: string;
    mixTapeMode: boolean;
    mixTapeName: string;
    onEditClicked: () => void;
  }
const Tape:React.FC<TapeProps> = ({coverArt, mixTapeMode, mixTapeName, onEditClicked}) =>  {


    return (
        <div >
            <img className='tape' src={MixTapeImagePaths.tape} onClick={onEditClicked}></img>
            <img className='tape cover-art' style={{width:"93%", left:"4vh"}} src={coverArt}></img>
            {mixTapeMode?<p className="mixed-tape-display-text">{mixTapeName}</p>:<></>}
        </div>
    );
}

export default Tape;
