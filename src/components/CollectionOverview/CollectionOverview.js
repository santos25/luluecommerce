import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { dataShopSelector } from '../../Redux/shop/shop.selectors';

//components
import SlickCollection from '../SlickCollection/SlickCollection';
import Header from '../Header/Header';

import {
    Box, makeStyles,
    Typography, GridList,
    GridListTile,
    GridListTileBar,
    IconButton,
    Grid
} from '@material-ui/core';

import { Info } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    // gridList: {
    //     // width: 500,
    //     // height: 450,
    // },
    gridListTile : {
        cursor: "pointer"
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    title:{
        marginTop: theme.spacing(5)
    }
}));

const CollectionOverview = ({ collections }) => {
    let history = useHistory();
    let match = useRouteMatch();

    const classes = useStyles();
    console.log(collections);
    
    return (
        <Box>
            {/* <Header/> */}
            <Grid container direction="column" alignItems="center" m>
                <Grid xs={12} item className={classes.title}>
                    <Typography variant="h5" > COLECCIONES  </Typography>
                </Grid>
                <Box  height="auto" width="auto" m={4} display="flex" justifyContent="center">
                    <Grid xs={12} item>
                        <div className={classes.root}>
                            <GridList cols={3} cellHeight={400}>
                                {collections.map((collection, i) => (
                                    <GridListTile key={i} 
                                            className={classes.gridListTile}
                                            onClick={() => history.push(`${match.url}/${collection.category}`)}>
                                        <img src={collection.items[0].image} alt={collection.items[0].name} />
                                        <GridListTileBar
                                            title={collection.category.toUpperCase()}
                                            // subtitle={<span>by: {tile.author}</span>}
                                            actionIcon={
                                                <IconButton aria-label={`info about ${collection.category}`} className={classes.icon}>
                                                    <Info />
                                                </IconButton>
                                            }
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>
                    </Grid>
                </Box>

                <Grid xs={12} item >
                    <Typography variant="h5" > NUEVAS PRENDAS  </Typography>
                </Grid>
                <Grid xs={12} item className={classes.title}>
                    <SlickCollection collections={collections[0].items} />
                </Grid>
            </Grid>
        </Box>

    );
}

const mapStateToProps = createStructuredSelector({
    collections: dataShopSelector
})

export default connect(mapStateToProps)(CollectionOverview);