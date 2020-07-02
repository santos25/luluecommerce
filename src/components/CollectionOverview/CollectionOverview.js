import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { dataShopSelector } from '../../Redux/shop/shop.selectors';

import {Info } from '@material-ui/icons';
import {
    Container,
    Grid,
    Typography,
    makeStyles,
    GridListTile,
    GridList,
    GridListTileBar,
    IconButton
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 700,
        height: 700
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

const CollectionOverview = ({ collections }) => {
    console.log(collections);
    const classes = useStyles();
    return (
        <Container maxWidth="lg">
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Typography variant="h4" >
                    COLECCIONES
                </Typography>


                <div className={classes.root}>
                    <GridList cellHeight={380} className={classes.gridList}>
                        {collections.map((collection) => (

                            <GridListTile key={collection.id}>

                                <img src={collection.items[0].image} alt={collection.items[0].name} />
                                <GridListTileBar
                                    title={collection.category}
                                    // subtitle={<span>by: {tile.author}</span>}
                                    actionIcon={
                                        <IconButton aria-label={`info about ${collection.category}`}
                                            className={classes.icon}>
                                            <Info />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </Grid>


        </Container>
    );
}

const mapStateToProps = createStructuredSelector({
    collections: dataShopSelector
})

export default connect(mapStateToProps)(CollectionOverview);