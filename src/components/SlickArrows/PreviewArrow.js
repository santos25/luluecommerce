import React from 'react';

const PreviewArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", color: "black" , marginLeft:25 , zIndex: 5 , fontSize: 15 }}
            onClick={onClick}
        />
    );
}

export default PreviewArrow;