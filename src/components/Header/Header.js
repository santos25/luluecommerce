import React from "react";
import Slider from "react-slick";

const Header = ({ image }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    arrows: false,
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <img src={image.image} alt="" />
        </div>
      </Slider>
    </div>
  );
};

export default Header;
