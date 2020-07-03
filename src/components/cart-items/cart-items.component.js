import React from 'react';
import './cart-item.styles.css';

import { ListItemAvatar, makeStyles, Avatar, ListItemText , ListItem} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));


const CardItems = ({ image, name, price, quantity }) => {
    const classes = useStyles();

    return (
        <ListItem >
            <ListItemAvatar>
                <Avatar alt={name} src={image} className={classes.large} />
            </ListItemAvatar>
            <ListItemText primary={name} />
            <ListItemText primary={price} />
            <ListItemText primary={quantity } />

            {/* <ListItemSecondaryAction>
                <IconButton aria-label="delete" onClick={() => handleRemoveItems(
                    {
                        idcollection: data.id,
                        productoid: product.id,
                    }, product.items[i])}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction> */}
        </ListItem>
        // <Grid container direction="row">
        //     <Grid item xs={3}>
        //     </Grid>
        //     <Grid item xs={3}><Typography component="h2"> {name}</Typography> </Grid>
        //     <Grid item xs={3}><Typography component="h2"> </Typography> </Grid>
        //     <Grid item xs={3}>{quantity} </Grid>

        // </Grid>
    )
}

export default CardItems;