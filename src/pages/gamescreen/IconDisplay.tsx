import React from 'react';
import anchor from "../../assets/car.svg";
import car from "../../assets/key.svg";
// ... import other images

const ICONS = {
    anchor: anchor,
    car: car,
    // ... other icons
};

const IconDisplay = (props) => {
    const { iconName } = props;

    return (
        <div className="icon-container">
            {/* Check if iconName is valid to prevent undefined errors */}
            {ICONS[iconName] ? (
                <img src={ICONS[iconName]} alt={iconName} />
            ) : (
                <p>Icon not found</p>
            )}
        </div>
    );
};

export default IconDisplay;
