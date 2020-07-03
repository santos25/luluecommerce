import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { dataShopSelector } from '../../Redux/shop/shop.selectors';

import {
    // Paper,
    Grid,
    Typography,
    makeStyles,
    CardActionArea,
    CardMedia,
    CardContent,
    Card,
    // Button,
    // CardActions
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345
    },
    media: {
        height: 340,
    },
}));

const CollectionOverview = ({ collections }) => {
    let history = useHistory();
    let match = useRouteMatch();

    const classes = useStyles();
    return (
        <div>
            <Grid
                container
                direction="row"
                justify="center"
            >
                <Typography variant="h5" >
                    COLECCIONES
            </Typography>
            </Grid>
            <Grid
                container
                direction="row"
            >
                {collections.map((collection) => (
                    <Grid key={collection.id} item xs={12} sm={4}>

                        <Card className={classes.root}>
                            <CardActionArea onClick={() => history.push(`${match.url}/${collection.category}`)}>
                                <CardMedia
                                    className={classes.media}
                                    alt={collection.items[0].name}
                                    image={collection.items[0].image}
                                />

                            </CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {collection.category}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>

    );
}

const mapStateToProps = createStructuredSelector({
    collections: dataShopSelector
})

export default connect(mapStateToProps)(CollectionOverview);