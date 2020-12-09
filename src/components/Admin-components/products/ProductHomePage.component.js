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

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [colelctionSelected, setCollectionSelected] = useState({
    category: "",
    collection: "",
  });
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("fetching Products");
    const refCollec = firestore.collection("genre").doc("mujer");
    refCollec.get().then((document) => {
      console.log(document.data());
      setCategories(document.data().categorias);
    });
  }, []);

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const handleSelectInputs = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCollectionSelected({ ...colelctionSelected, [name]: value });
    if (name === "collection") {
      const collectionRef = firestore
        .collection("collections")
        .doc("kZzILXWTxyZYglE6IDLx")
        .collection("categories")
        .where("name", "==", value);

      collectionRef.get().then((snapshot) => {
        const data = snapshot.docs[0].data();
        console.log(data.products);
        setProducts(data.products);
      });
    } else {
      setCollections(categories[value]);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <ProductList
            handleSelectInputs={handleSelectInputs}
            colelctionSelected={colelctionSelected}
            categories={Object.keys(categories)}
            collections={collections}
            products={products}
            handleCurrentPage={handleCurrentPage}
          />
        );
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
