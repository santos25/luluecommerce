import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchingProductsAsync, removeItemsAsync } from "../../../Redux/Admin/Products/product.actions";
import { productSelector, isFetchSelector } from "../../../Redux/Admin/Products/product.selectors";

import { storage, uploadProductAndImage } from '../../../FireBase/FireBaseUtil';
import CreateProduct from './CreateProduct.component';
import WithSpinner from '../../with-spinner/withSpinner';

import {

    makeStyles,
    Container,
    Button,
    Typography,
    CssBaseline,
    ListItem,
    Avatar,
    List,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Grid,
    IconButton

} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
      },
}));

const ProductList = ({ datas, handleCurrentPage, handleRemoveItems }) => {
    const classes = useStyles();
    return datas.map((data, i) => {
        return (<Container key={i} component="main" maxWidth="xs">  
              <Typography component="h4"> TIENDA : {data.brand}</Typography>

            <Typography component="h4"> GENERO : {data.genre}</Typography>
            <Button
                onClick={() => handleCurrentPage({
                    idcollection: data.id,
                    brand: data.brand,
                    genre: data.genre
                }, 'create')}
                variant="contained"
                color="primary"
            >
                Agregar Categoria
                                </Button>
            {
                data.productos.map((product, index) => {
                    return <div key={index}>

                        <Typography component="h4"> CATEGORIA :  {product.category}</Typography>
                        <Button
                            onClick={() => handleCurrentPage({
                                idcollection: data.id,
                                brand: data.brand,
                                genre: data.genre,
                                productoid: product.id,
                                category: product.category
                            }, 'create')}
                            variant="contained"
                            color="primary"
                        >
                            Agregar Items
                                </Button>
                        <List dense >
                            {
                                product.items.map((item, i) => {
                                    // const labelId = `checkbox-list-secondary-label-${item.name}`;
                                    return (
                                        <ListItem key={i} button>
                                            <ListItemAvatar>
                                                <Avatar
                                                    className={classes.large}
                                                    alt={item.name}
                                                    src={item.image}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText primary={item.name} secondary={item.price} />

                                            <ListItemSecondaryAction>
                                                <IconButton aria-label="delete" onClick={() => handleRemoveItems(
                                                    {
                                                        idcollection: data.id,
                                                        productoid: product.id,
                                                    }, product.items[i])}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    );
                                })
                            }
                        </List>
                    </div>
                })
            }
        </Container>)
    })
}

const ProductListWithSpinner = WithSpinner(ProductList);


const ProductPage = ({ fetchProductsAsync, products, isFetchingProducts, removeItem }) => {
    const [currentPage, setCurrentPage] = useState("home");
    const [product, setProduct] = useState(null);

    useEffect(() => {
        console.log("fetching Products");
        fetchProductsAsync();
    }, []);


    const handleCurrentPage = (product, pagetogo) => {
        setProduct(product)
        setCurrentPage(pagetogo)
    }

    // const handleAddItems = (product, pagetogo) => {
    //     console.log(product);
    //     setCurrentPage(pagetogo)
    //     setProduct(product)
    // }

    // const handleAddCategory = (product, pagetogo) => {
    //     console.log(product);
    //     setCurrentPage(pagetogo)
    //     setProduct(product)
    // }

    const handleRemoveItems = (product, item) => {
        console.log(item);
        removeItem(product, item)
    }

    return (
        <div>
            {currentPage === 'home' ? (
                <Container component="main" maxWidth="sm">
                    <Button
                        onClick={() => handleCurrentPage("" , "create")}
                        variant="contained"
                        color="primary"
                    >
                        Registrar Marca o genero
                  </Button>
                    <ProductListWithSpinner isLoading={isFetchingProducts} datas={products}
                        handleCurrentPage={handleCurrentPage}
                        handleRemoveItems={handleRemoveItems}
                         />
                </Container>
            ) :
                <CreateProduct productEdit={product}
                    handleCurrentPage={handleCurrentPage}
                    backStep={() => setCurrentPage("home")} />

            }
        </div>
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
