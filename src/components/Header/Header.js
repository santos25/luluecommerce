import React from 'react';
// import logo1 from "../../assets/images/imageone.jpg";
// import logo2 from "../../assets/images/imagetwo.jpg";
import Slider from "react-slick";

const Header = ({image}) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
        arrows: false
       
    };

    return (
        <div>
            <Slider {...settings}>
                <div>
                    <img src={image} alt="" />
                </div>
            </Slider>
        </div>

    );
}

export default Header;