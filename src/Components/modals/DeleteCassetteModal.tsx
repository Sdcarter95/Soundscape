import React, { useEffect, useState } from 'react';
import AbstractModal from './AbstractModal';
import "./css/DeleteCassetteModal.css";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteCassetteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete }) => {
    const [closeAnimation, setCloseAnimation] = useState<boolean>(false);

    useEffect(() => {
        setCloseAnimation(false);
    }, [closeAnimation]);

    const handleDelete = () => {
        setCloseAnimation(true);
        onDelete();
    }

    return (
        <div className='delete-modal-wrapper'>
            <AbstractModal isOpen={isOpen} onClose={onClose} runCloseAnimation={closeAnimation}>
                <div className='delete-modal-content'>
                    <p className='delete-cassette-msg'>Do you want to delete the current tape?</p>
                    <div className='delete-cassette-buttons'>
                        <button className='delete-cassette-button' onClick={handleDelete}>Yes</button>
                        <button className='delete-cassette-button' onClick={() => setCloseAnimation(true)}>No</button>
                    </div>
                </div>
            </AbstractModal>
        </div>
    );
};

export default DeleteCassetteModal;