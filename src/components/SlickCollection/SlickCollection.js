import React from "react";
import Slider from "react-slick";
import NextArrow from "../SlickArrows/NextArrow";
import PreviewArrow from "../SlickArrows/PreviewArrow";
import CardImages from "../CardImages/CardImages";
import { Container } from "@material-ui/core";

const SlickCollection = ({ collections, slidesToShow }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreviewArrow />,
  };

  // console.log(collections);
  return (
    <Container>
      <Slider {...settings}>
        {collections.products
          .filter((_, index) => index < 10)
          .map((product, indexColl) => (
            <CardImages
              key={indexColl}
              item={product}
              typeCollection={collections.type}
              iconFav={false}
              renderActions={null}
            />
          ))}
      </Slider>
    </Container>
  );
};

export default SlickCollection;
