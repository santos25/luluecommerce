import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchingCollectionsAsync} from '../../Redux/shop/shop.actions';

import CollectionOverview from '../../components/CollectionOverview/CollectionOverview'
import {
    CssBaseline
} from '@material-ui/core';

const MujerPage = ({fetchCollections }) => {

    useEffect(() => {
        console.log("Fetching Collection");
        
        fetchCollections("mujer");
    }, [fetchCollections])
    return (
        <div>
            <CssBaseline />
            <CollectionOverview />
        </div>
    );
}

const mapDispatchToState = (dispatch) => ({
    fetchCollections : (genre) => dispatch(fetchingCollectionsAsync(genre))
})

// const mapStateToProps = (state) => ({
//     collections : 
// })
export default connect(null , mapDispatchToState)(MujerPage);