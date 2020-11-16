import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";

//actions
import {
  fetchingCollectionsOverViewAsync,
  fetchingSuggestedCollectionsAsync,
} from "../../Redux/shop/shop.actions";

//selectors
import {
  isLoadingOverView,
  categoriesSelector,
} from "../../Redux/shop/shop.selectors";

//components
import CollectionOverview from "../../components/CollectionOverview/CollectionOverview";
import CollectionPage from "../CollectionPage/CollectionPage";
import ProductDetail from "../../components/productDetail/ProductDetail";

//HOC
import WithSpinner from "../../components/with-spinner/withSpinner";

const CollectionOverviewWitSpinner = WithSpinner(CollectionOverview);
const CollectionPageWitSpinner = WithSpinner(CollectionPage);
const ProductDetailWitSpinner = WithSpinner(ProductDetail);

const ShopPage = ({ isLoading, fetchCollectionsOverView }) => {
  let match = useRouteMatch();
  let { tagid } = match.params;

  // useEffect(() => {
  //   console.log("rendering ShopPage");
  //   // fetchCollectionsOverView(tagid);

  //   // if (categories.length > 0) {
  //   //   const pickedCategory =
  //   //     categories[Math.floor(Math.random() * categories.length)];
  //   //   const pickedProduct =
  //   //     pickedCategory[Math.floor(Math.random() * pickedCategory.length)];
  //   //   fetchSuggestedCollections(tagid, pickedProduct.name);
  //   // } else {
  //   //   console.log("null categories");
  //   // }
  // }, [tagid, fetchCollectionsOverView]);

  return (
    <Switch>
      <Route exact path={match.path}>
        <CollectionOverviewWitSpinner isLoading={isLoading} tagId={tagid} />
      </Route>
      <Route
        exact
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionPageWitSpinner
            // isLoading={isLoading}
            // tagId={tagid}
            {...props}
          />
        )}
      ></Route>
      <Route
        path={`${match.path}/:collectionId/:productId`}
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
  fetchCollectionsOverView: (genre) =>
    dispatch(fetchingCollectionsOverViewAsync(genre)),
});

const mapStateToProps = (state) => ({
  isLoading: isLoadingOverView(state),
  // categories: categoriesSelector()(state),
});

export default connect(mapStateToProps, mapDispatchToState)(ShopPage);
