import React from 'react';
import { connect } from 'react-redux';
import { dataCollectionSelector } from '../../Redux/shop/shop.selectors';
import CardImages from '../../components/CardImages/CardImages';
// import './collection.styles.css';

import {
    Grid
} from '@material-ui/core';

const CollectionPage = ({ collection }) => {

    const { items } = collection;
    // console.log(collection);

    return (
            <Grid
                container
                direction="row"
            >
                    {
                        items.map(item => (
                            <Grid key={item.id} item xs={12} sm={4}>
                                <CardImages item={item} />
                            </Grid>
                        )
                        )
                    }
            </Grid>
    )
}

const mapStateToProps = (state, ownProps) => ({
    collection: dataCollectionSelector(ownProps.match.params.collectionId)(state)
})


export default connect(mapStateToProps)(CollectionPage);