import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchingCollectionsAsync } from '../../Redux/shop/shop.actions';
import { isLoadingCollections } from '../../Redux/shop/shop.selectors';

import CollectionOverview from '../../components/CollectionOverview/CollectionOverview';
import CollectionPage from '../CollectionPage/CollectionPage';

import WithSpinner from '../../components/with-spinner/withSpinner';

const CollectionOverviewWitSpinner = WithSpinner(CollectionOverview);
const CollectionPageWitSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ fetchCollections, isLoading }) => {

    let match = useRouteMatch();
    let {tagid} = match.params;

    useEffect(() => {

        console.log("Fetching ShopPage");

        fetchCollections(tagid);
    }, [tagid, fetchCollections]);

    console.log({ isLoading });
    console.log({ match });

    return (
        <Switch>
            <Route exact path={match.url}>
                <CollectionOverviewWitSpinner isLoading={isLoading}  />
            </Route>
            <Route path={`${match.url}/:collectionId`}
                render={(props) => <CollectionPageWitSpinner isLoading={isLoading} {...props} />}>
            </Route>
        </Switch>
    )
}

const mapDispatchToState = (dispatch) => ({
    fetchCollections: (genre) => dispatch(fetchingCollectionsAsync(genre))
})

const mapStateToProps = (state) => ({
    isLoading: isLoadingCollections(state)
})

export default connect(mapStateToProps, mapDispatchToState)(ShopPage);