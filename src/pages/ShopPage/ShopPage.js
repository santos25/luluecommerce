import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchingCollectionsAsync } from '../../Redux/shop/shop.actions';
import { isLoadingCollections } from '../../Redux/shop/shop.selectors';

// import ShopOverview from '../../components/ShopOverview/ShopOverview';
import CollectionPage from '../collectionPage/collectionPage';
import WithSpinner from '../../components/with-spinner/withSpinner';

// const ShopOverviewWitSpinner = WithSpinner(ShopOverview);
const CollectionPageWitSpinner = WithSpinner(CollectionPage);

const ShopPage = (props) => {

    useEffect(() => {
        console.log("Fetching ShopPa");
        
        props.fetchingCollectionsAsync();
    }, [fetchingCollectionsAsync]);

    const { match, isLoading } = props;
    console.log({ isLoading });

    return (
        <Switch>
            <Route exact path={match.url}>
                {/* <ShopOverviewWitSpinner isLoading={isLoading} {...props} /> */}
            </Route>
            <Route path={`${match.url}/:collectionId`}
                render={(props) => <CollectionPageWitSpinner isLoading={isLoading} {...props} />}>
            </Route>
        </Switch>
    )
}

const mapDispatchToState = (dispatch) => ({
    fetchingCollectionsAsync: () => dispatch(fetchingCollectionsAsync())
})

const mapStateToProps = (state) => ({
    isLoading: isLoadingCollections(state)
})

export default connect(mapStateToProps, mapDispatchToState)(ShopPage);