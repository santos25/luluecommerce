import React from 'react';
import first from "../assets/images/first.jpg";
import second from "../assets/images/second.jpg";
import third from "../assets/images/third.jpg";
import fourth from "../assets/images/fourth.jpg";
import fifth from "../assets/images/fifth.jpg";
import '../assets/custom.css';


const Slider = ({ previous, next }) => {
    return (
        <div className="slider-container">
            <button id="previous" className="" onClick={() => previous()}>prev</button>
            <button id="next" className="ml-4" onClick={() => next()}>Next</button>
            <div className="carrusel-slider">
                <img id="lastClone" src={fifth} alt="fi" />
                <img src={first} alt="F" />
                <img src={second} alt="s" />
                <img src={third} alt="t" />
                <img src={fourth} alt="fo" />
                <img src={fifth} alt="fi" />
                <img id="firstClone" src={first} alt="F" />
            </div>
        </div>
    );
}


export default Slider;