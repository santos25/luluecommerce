import React, { useState } from 'react';
import { useHistory, useRouteMatch } from "react-router-dom";
import { connect } from 'react-redux';
import { storage, uploadImages, uploadProductDB } from '../../../FireBase/FireBaseUtil';
import { isUploadinSelector } from "../../../Redux/Admin/Products/product.selectors";
import { addNewItemsAsync, addCategory, uploadProductsStart, uploadProductsSuccess } from '../../../Redux/Admin/Products/product.actions';

import {
    CircularProgress,
    makeStyles,
    Container,
    Button,
    Typography,
    CssBaseline,
    Grid,
    TextField
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    }
}));

const CreateProduct = ({ backStep, productEdit, addNewItems, handleCurrentPage, addNewCategory, uploadStart, uploadSuccess, isUploading }) => {
    const classes = useStyles();

    const [product, setProduct] = useState({ brand: '', category: '', genre: '', itemsQuantity: 1 })
    let [items, setItems] = useState([{ image: {}, name: '', price: 0 }])

    const handleInputs = (e) => {
        const { name, value } = e.target;

        if (name === 'itemsQuantity') {
            items = []
            for (let index = 0; index < value; index++) {
                items.push({ id: index, image: {}, name: '', price: 0 })
            }
            setItems([...items])
        } else
            setProduct({ ...product, [name]: value });
    }

    const handleItems = (e, indexChange) => {
        const { name, value } = e.target;

        let objectChanged = { ...items[indexChange] };

        if (name === 'image') {
            objectChanged[name] = e.target.files[0];
            items[indexChange] = objectChanged;
            setItems([...items])
        } else {
            objectChanged[name] = value;
            items[indexChange] = objectChanged;
            setItems([...items])
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log({ product });
        console.log({ items });
        uploadStart()
        const uploadedItemsImages = await uploadImages(items);
        console.log(uploadedItemsImages);
        const result = await uploadProductDB(product, uploadedItemsImages);
        uploadSuccess()
    }

    const handleAddNewItems = async (e) => {
        e.preventDefault();
        if (productEdit.category) {
            addNewItems({ ...productEdit, items })
            handleCurrentPage("home")
        } else {
            // const uploadedItemsImages = await uploadImages(items);
            addNewCategory({ idcollection: productEdit.idcollection, category: product.category, items })
        }


    }

    // console.log({ productEdit });

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        Registro de Productos
          </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    onChange={handleInputs}
                                    // autoComplete="fname"
                                    name="category"
                                    variant="outlined"
                                    required
                                    defaultValue={productEdit ? productEdit.category : null}
                                    fullWidth
                                    id="category"
                                    label="Categoria"
                                // autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    onChange={handleInputs}
                                    // autoComplete="fname"
                                    name="brand"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="brand"
                                    label="Tienda"
                                    defaultValue={productEdit ? productEdit.brand : null}

                                // autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    onChange={handleInputs}
                                    // autoComplete="fname"
                                    name="genre"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="genre"
                                    label="Genero"
                                    defaultValue={productEdit ? productEdit.genre : null}

                                // autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography component="h3" variant="h5">
                                    Items
                            </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    onChange={handleInputs}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    defaultValue={product.itemsQuantity}
                                    id="itemsQuantity"
                                    label="Cantidad"
                                    name="itemsQuantity"
                                // autoComplete="email"
                                />
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            <Container component="main" maxWidth="sm">
                <div className={classes.paper}>
                    {items.map((item, index) => {
                        return (
                            <Grid key={index} container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        onChange={(e) => handleItems(e, index)}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id={`name_${index}`}
                                        label="Nombre"
                                        name="name"
                                    // autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        type="file"
                                        required
                                        id={`image_${index}`}
                                        onChange={(e) => handleItems(e, index)}
                                        name="image"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        onChange={(e) => handleItems(e, index)}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id={`price_${index}`}
                                        label="Precio"
                                        name="price"
                                    />
                                </Grid>
                            </Grid>
                        )
                    })}
                    {isUploading ? (
                        <div className={classes.root}>
                            <CircularProgress />
                        </div>
                    )
                        : null
                    }
                    {productEdit ? (
                        <Button
                            onClick={handleAddNewItems}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Agregar Items
                        </Button>
                    ) : (
                            <Button
                                onClick={handleRegister}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Registrar Productos
                            </Button>
                        )

                    }
                    <Button
                        onClick={backStep}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Regresar
                     </Button>
                </div>
            </Container>
        </div>


    )
}

const mapDispatchToState = (dispatch) => ({
    addNewItems: (product) => dispatch(addNewItemsAsync(product)),
    addNewCategory: (product) => dispatch(addCategory(product)),
    uploadStart: () => dispatch(uploadProductsStart()),
    uploadSuccess: () => dispatch(uploadProductsSuccess())

})

const mapStateToProps = (state) => ({
    isUploading : isUploadinSelector(state)
})

export default connect(mapStateToProps, mapDispatchToState)(CreateProduct);
