import React from 'react';
import { connect } from 'react-redux';
import { dataCollectionSelector } from '../../Redux/shop/shop.selectors';
import CardImages from '../../components/CardImages/CardImages';
// import './collection.styles.css';

import {
    Grid
} from '@material-ui/core';

const CollectionPage = ({ itemscollection }) => {

    // console.log(itemscollection);
    return (
            <Grid container
                direction="row"
            >
                    {
                        itemscollection.map((item, i) => (
                            <Grid key={i} item xs={12} sm={3}>
                                <CardImages item={item} />
                            </Grid>
                        )
                        )
                    }
            </Grid>
    )
}

const mapStateToProps = (state, ownProps) => ({
    itemscollection: dataCollectionSelector(ownProps.match.params.collectionId)(state)
})


export default connect(mapStateToProps)(CollectionPage);