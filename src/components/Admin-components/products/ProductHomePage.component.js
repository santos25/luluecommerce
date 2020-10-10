import React, { useEffect } from "react";
// import { useHistory, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchingProductsAsync } from "../../../Redux/Admin/Products/product.actions";
import {
  productSelector,
  isFetchSelector,
} from "../../../Redux/Admin/Products/product.selectors";

// import { storage, uploadProductAndImage } from '../../../FireBase/FireBaseUtil';
import ProductList from "./ProductList";
import WithSpinner from "../../with-spinner/withSpinner";

import {} from "@material-ui/core";

const ProductListWithSpinner = WithSpinner(ProductList);

const ProductPage = ({ fetchProductsAsync, products, isFetchingProducts }) => {
  // const [currentPage, setCurrentPage] = useState("home");
  // const [product, setProduct] = useState(null);

  // console.log(products);
  useEffect(() => {
    console.log("fetching Products");
    fetchProductsAsync();
  }, [fetchProductsAsync]);

  return (
    <div>
      <ProductListWithSpinner
        isLoading={isFetchingProducts}
        products={products}
        // handleCurrentPage={handleCurrentPage}
        // handleRemoveItems={handleRemoveItems}
      />
    </div>
  );
};

const mapDispatchToState = (dispatch) => ({
  fetchProductsAsync: () => dispatch(fetchingProductsAsync()),
});

const mapStatetoProps = (state) => ({
  products: productSelector(state),
  isFetchingProducts: isFetchSelector(state),
});

export default connect(mapStatetoProps, mapDispatchToState)(ProductPage);
