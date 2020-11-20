import React from "react";
import Slider from "react-slick";
import { useHistory, useRouteMatch } from "react-router-dom";

import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  header: {
    cursor: "pointer",
  },
  landscape: {
    // maxWidth: "1170px",
    margin: "0 auto 40px",
    maxHeight: "1170px",
  },
}));
const Header = ({ images }) => {
  const history = useHistory();
  const match = useRouteMatch();
  const classes = useStyles();

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
    <div className={classes.landscape}>
      <Slider {...settings}>
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className={classes.header}
              // onClick={() => history.push(`${match.url}/${image.link}`)}
            >
              <img src={image} alt="" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Header;
