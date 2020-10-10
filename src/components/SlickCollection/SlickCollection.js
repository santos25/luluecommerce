import React from "react";
import Slider from "react-slick";
import NextArrow from "../SlickArrows/NextArrow";
import PreviewArrow from "../SlickArrows/PreviewArrow";
import CardImages from "../CardImages/CardImages";

import { Container } from "@material-ui/core";

const SlickCollection = ({ collections, tagId }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PreviewArrow />,
  };
  console.log({ collections });
  return (
    <Container>
      <Slider {...settings}>
        {collections.map((collection, i) => (
          <CardImages key={i} item={collection} tagId={tagId} />
        ))}
      </Slider>
    </Container>
  );
};

export default SlickCollection;
