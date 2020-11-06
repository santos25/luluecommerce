import React from "react";
import Slider from "react-slick";
import NextArrow from "../SlickArrows/NextArrow";
import PreviewArrow from "../SlickArrows/PreviewArrow";
import CardImages from "../CardImages/CardImages";

import { Button, Container } from "@material-ui/core";

const SlickCollection = ({ collections }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreviewArrow />,
  };

  return (
    <Container>
      <Slider {...settings}>
        {collections
          .filter((_, index) => index < 10)
          .map((product, indexColl) => (
            <CardImages
              key={indexColl}
              item={product}
              iconFav={false}
              renderActions={null}
            />
          ))}
      </Slider>
    </Container>
  );
};

export default SlickCollection;
