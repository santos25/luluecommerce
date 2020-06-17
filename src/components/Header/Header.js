import React from 'react';
// import logo1 from "../../assets/images/imageone.jpg";
// import logo2 from "../../assets/images/imagetwo.jpg";
import Slider from "react-slick";

const Header = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        className: "slides",
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false
        // nextArrow: <NextArrow />,
        // prevArrow: <PreviewArrow />
    };

    return (
        <div>
            {/* <br/><br/> */}
            <div className="slider-container">
                <Slider {...settings}>
                    <div>
                        <img src="https://extra.modalia.com.co/extras/fotos/contenidos/789/desktop-10-mill-redes.jpg?18/05/2020" alt="" />
                    </div>
                    <div>
                        <img src="https://extra.modalia.com.co/extras/fotos/contenidos/789/desktop-10-mill-redes.jpg?18/05/2020" alt="" />
                    </div>
                 
                </Slider>
            </div>
        </div>
    );
}

export default Header;