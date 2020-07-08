import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { newCollectionsHomeSelector } from '../../Redux/directory/directory.selectors';
import { loadDiscountClothes } from '../../Redux/directory/directory.action';

//components
import Header from '../../components/Header/Header';
// import CardImages from '../CardImages/CardImages';
import SlickCollection from '../SlickCollection/SlickCollection'

import {StarBorderTwoTone} from '@material-ui/icons'
import {
    Box, Typography, makeStyles,
    GridListTileBar,
    GridList,
    GridListTile,
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
        width: 900,
        // height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
}));

const Directory = ({ newCollections, loadItems }) => {
    console.log(newCollections);
    const classes = useStyles();

    // useEffect(() => {
    //     console.log("Fetching Discount");

    //     fetch('https://pixabay.com/api/?key=16434003-adc3d5ed6b80ff05886e00162&category=fashion&min_height=100')
    //         .then(data => data.json())
    //         .then(result => loadItems(result.hits))
    //         .catch(error => console.log(error));
    // }, [loadItems]);

    // let { discountItems } = this.props;
    return (
        <Box>
            {/* <Header /> */}
            <Box m={4} display="flex" justifyContent="center">
                <Typography variant="h5">
                    COLECCIONES
                    </Typography>
            </Box>
            <Box>
                <div className={classes.root}>
                    <GridList cellHeight={200} spacing={4} cols={4} className={classes.gridList}>
                        {newCollections.map((collection, i) => (
                            <GridListTile key={i} cols={collection.featured ? 2 : 1} rows={collection.featured ? 2 : 1}>
                                <img src={collection.items[0].image} alt="" />
                                <GridListTileBar
                                    title={collection.items[0].name}
                                    titlePosition="top"
                                    actionIcon={
                                        <IconButton aria-label={`star ${collection.items[0].name}`} className={classes.icon}>
                                            <StarBorderTwoTone />
                                        </IconButton>
                                    }
                                    actionPosition="left"
                                    className={classes.titleBar}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </Box>
            <Box m={3} display="flex" justifyContent="flex-start">
                <Typography variant="h5">
                    New Colecciones
                    </Typography>
            </Box>
            <Box>
                {/* <SlickCollection collections={newCollections[0].items} /> */}
            </Box>
        </Box>
    );
}

const mapStateToProps = createStructuredSelector({
    newCollections: newCollectionsHomeSelector
})

const mapDispatchToState = (dispatch) => ({
    loadItems: (data) => dispatch(loadDiscountClothes(data))
})

export default connect(mapStateToProps, mapDispatchToState)(Directory);

