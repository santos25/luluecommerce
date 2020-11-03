import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";

//redux
import { fetchingCollectionsAsync } from "../../Redux/shop/shop.actions";
import { isLoadingCollections } from "../../Redux/shop/shop.selectors";

//components
import CollectionOverview from "../../components/CollectionOverview/CollectionOverview";
import CollectionPage from "../CollectionPage/CollectionPage";
import ProductDetail from "../../components/productDetail/ProductDetail";
//HOC
import WithSpinner from "../../components/with-spinner/withSpinner";

const CollectionOverviewWitSpinner = WithSpinner(CollectionOverview);
const CollectionPageWitSpinner = WithSpinner(CollectionPage);
const ProductDetailWitSpinner = WithSpinner(ProductDetail);

const ShopPage = ({ isLoading, fetchCollections }) => {
  let match = useRouteMatch();
  let { tagid } = match.params;

  useEffect(() => {
    console.log("rendering ShopPage");
    console.log(tagid);
    fetchCollections(tagid);
  }, [tagid, fetchCollections]);

  // console.log({ isLoading });
  // console.log({ match });

  return (
    <Switch>
      <Route exact path={match.url}>
        <CollectionOverviewWitSpinner isLoading={isLoading} tagId={tagid} />
      </Route>
      <Route
        exact
        path={`${match.url}/:collectionId`}
        render={(props) => (
          <CollectionPageWitSpinner
            isLoading={isLoading}
            tagId={tagid}
            {...props}
          />
        )}
      ></Route>
      <Route
        path={`${match.url}/:collectionId/:productId`}
        render={(props) => (
          <ProductDetailWitSpinner
            isLoading={isLoading}
            {...props}
            tagId={tagid}
          />
        )}
      ></Route>
    </Switch>
  );
};

const mapDispatchToState = (dispatch) => ({
  fetchCollections: (genre) => dispatch(fetchingCollectionsAsync(genre)),
});

const mapStateToProps = (state) => ({
  isLoading: isLoadingCollections(state),
});

export default connect(mapStateToProps, mapDispatchToState)(ShopPage);
