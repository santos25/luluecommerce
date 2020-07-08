import React from 'react';
import './cart-item.styles.css';

import { makeStyles, Avatar, Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));


const CardItems = ({ image, name, price, quantity }) => {
    const classes = useStyles();

    return (
        <Box display="flex" justifyContent="space-between">

            <Avatar alt={name} src={image} className={classes.large} />

            <Typography component="h6">
                {name}
            </Typography>
            <Typography component="h6">
                {`$${price}`}
            </Typography>
            <Typography component="h6">
                {quantity}
            </Typography>
        </Box>
    )
}

export default CardItems;