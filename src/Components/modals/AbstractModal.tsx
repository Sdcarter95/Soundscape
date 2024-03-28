import React, { ReactNode, useEffect, useState } from 'react';
import "./css/AbstractModal.css"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    runCloseAnimation: boolean;
}

const AbstractModal: React.FC<ModalProps> = ({ isOpen, onClose, children, runCloseAnimation }) => {
    const [closing, setClosing] = useState<boolean>(false);
    const pullyImage = "https://i.imgur.com/mrxFbVP.png"

    useEffect(() => {
        if (runCloseAnimation) {
            closeAnimation();
        }
    }, [runCloseAnimation])

    const closeAnimation = () => {
        setClosing(true);
        const animationDuration = 1500;
        const closeTimeout = setTimeout(() => {
            setClosing(false);
            onClose();
        }, animationDuration);
        return () => clearTimeout(closeTimeout);
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className={closing ? 'modal-back-ground close-modal' : 'modal-back-ground'}/>
            <div className={closing ? "rolldown-wrapper close-modal" : "rolldown-wrapper"}>
                <div className='screen' >
                    {children}
                </div>
                <img src={pullyImage} className='pully' />
                <button onClick={closeAnimation} className='close-modal-button'>Close</button>
            </div>
        </div>
    );
};

export default AbstractModal;