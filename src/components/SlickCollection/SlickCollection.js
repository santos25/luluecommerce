import React from 'react'
import Slider from "react-slick";
import NextArrow from '../SlickArrows/NextArrow';
import PreviewArrow from '../SlickArrows/PreviewArrow';
import CardImages from '../CardImages/CardImages'

import { Container } from '@material-ui/core';

const SlickCollection = ({ collections }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <NextArrow />,
        prevArrow: <PreviewArrow />
    };

    return (
        <Container>
            <Slider {...settings}>
                {collections.map((collection, i) => (
                    <CardImages key={i} item={collection} />
                ))}
            </Slider>
        </Container>

    )
}

export default SlickCollection
