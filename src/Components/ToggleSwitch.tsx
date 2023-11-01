import React, { useState } from 'react';
import './css/ToggleSwitch.css'; // Import your CSS for styling

interface ToggleSwitchProps {
    onChange: (isChecked: boolean) => void;
    isChecked: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onChange, isChecked }) => {
    const toggle = () => {
        onChange(!isChecked);
    };

    return (
        <label className={`toggle-switch ${isChecked ? 'checked' : ''}`} onClick={toggle}>
            <div className={`slider round ${isChecked ? 'checked' : ''}`}></div>
        </label>
    );
};

export default ToggleSwitch;