import React, { useState, useEffect } from 'react';
// import { useHistory, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchingProductsAsync, removeItemsAsync } from "../../../Redux/Admin/Products/product.actions";
import { productSelector, isFetchSelector } from "../../../Redux/Admin/Products/product.selectors";

// import { storage, uploadProductAndImage } from '../../../FireBase/FireBaseUtil';
import CreateProduct from './CreateProduct.component';
import ProductList from './ProductList';
import WithSpinner from '../../with-spinner/withSpinner';

import {
    Container,
    Button,
    Box
} from '@material-ui/core';


const ProductListWithSpinner = WithSpinner(ProductList);


const ProductPage = ({ fetchProductsAsync, products, isFetchingProducts, removeItem }) => {
    const [currentPage, setCurrentPage] = useState("home");
    const [product, setProduct] = useState(null);

    useEffect(() => {
        console.log("fetching Products");
        fetchProductsAsync();
    }, [fetchProductsAsync]);


    const handleCurrentPage = (product, pagetogo) => {
        setProduct(product)
        setCurrentPage(pagetogo)
    }

    const handleRemoveItems = (product, item) => {
        console.log(item);
        removeItem(product, item)
    }

    return (
        <div>
            {currentPage === 'home' ? (
                <Box>
                    <Container maxWidth="sm">
                        <Button
                            onClick={() => handleCurrentPage("", "create")}
                            variant="outlined"
                            size="small"
                            color="primary"
                        >
                            Registrar Marca o genero
                  </Button>

                    </Container>
                    <Box>
                        <ProductListWithSpinner isLoading={isFetchingProducts} datas={products}
                            handleCurrentPage={handleCurrentPage}
                            handleRemoveItems={handleRemoveItems}
                        />
                    </Box>
                </Box>
            ) :
                <CreateProduct productEdit={product}
                    handleCurrentPage={handleCurrentPage}
                    backStep={() => setCurrentPage("home")} />

            }
        </div >
    )
}

const mapDispatchToState = (dispatch) => ({
    fetchProductsAsync: () => dispatch(fetchingProductsAsync()),
    removeItem: (product, item) => dispatch(removeItemsAsync(product, item))
})

const mapStatetoProps = state => ({
    products: productSelector(state),
    isFetchingProducts: isFetchSelector(state)
})

export default connect(mapStatetoProps, mapDispatchToState)(ProductPage);
