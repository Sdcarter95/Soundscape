import React, { useState } from 'react';
import './css/ToggleSwitch.css'; // Import your CSS for styling

interface ToggleSwitchProps {
    onChange: (checked: boolean) => void;
    checked: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onChange, checked }) => {
    const toggle = () => {
        onChange(!checked);
    };

    return (
        <label className={`toggle-switch ${checked ? 'checked' : ''}`} onClick={toggle}>
            <div className={`toggle-slider round ${checked ? 'checked' : ''}`}></div>
        </label>
    );
};

export default ToggleSwitch;