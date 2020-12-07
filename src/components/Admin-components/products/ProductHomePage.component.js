import React, { useState, useEffect } from "react";
// import { useHistory, useRouteMatch } from "react-router-dom";

// import { connect } from "react-redux";
// import { fetchingProductsAsync } from "../../../Redux/Admin/Products/product.actions";
// import {
//   productSelector,
//   isFetchSelector,
// } from "../../../Redux/Admin/Products/product.selectors";

// import { storage, uploadProductAndImage } from '../../../FireBase/FireBaseUtil';
import ProductList from "./ProductList";
import CreateProduct from "./CreateProduct.component";
import EditProduct from "./EditProduct";

import WithSpinner from "../../with-spinner/withSpinner";

import { firestore } from "../../../FireBase/FireBaseUtil";

import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";

const ProductListWithSpinner = WithSpinner(ProductList);

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState("home");
  // const [products, setProducts] = useState([]);
  // const [genre, setGenre] = useState("");

  const classes = useStyles();
  // console.log(products);
  useEffect(() => {
    console.log("fetching Products");

    // fetchProductsAsync();
  }, []);

  const handleGenre = (e) => {
    setGenre(e.target.value);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <ProductList />;
      case "edit":
        return <EditProduct />;
      case "create":
        return <CreateProduct />;
      default:
        break;
    }
  };
  return (
    <Grid container>
      <Grid xs={12} item>
        {renderPage()}
      </Grid>
    </Grid>
    // {/* <ProductListWithSpinner
    //   isLoading={isFetchingProducts}
    //   products={products}

    // /> */}
  );
};

// const mapDispatchToState = (dispatch) => ({
//   fetchProductsAsync: () => dispatch(fetchingProductsAsync()),
// });

// const mapStatetoProps = (state) => ({
//   products: productSelector(state),
//   isFetchingProducts: isFetchSelector(state),
// });

// export default connect(mapStatetoProps, mapDispatchToState)(ProductPage);
export default ProductPage;
