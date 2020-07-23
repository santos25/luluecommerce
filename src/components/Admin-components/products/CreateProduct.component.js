import React, { useState, useEffect } from 'react';
// import { useHistory, useRouteMatch } from "react-router-dom";
import { connect } from 'react-redux';
import { uploadImages, uploadProductDB, firestore } from '../../../FireBase/FireBaseUtil';
import { isUploadinSelector } from "../../../Redux/Admin/Products/product.selectors";
import { addNewItemsAsync, addCategory, uploadProductsStart, uploadProductsSuccess } from '../../../Redux/Admin/Products/product.actions';

import { CloudUpload } from '@material-ui/icons';
import {
    CircularProgress,
    makeStyles,
    useTheme,
    Container,
    Button,
    Typography,
    CssBaseline,
    Grid,
    TextField,
    Chip,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input
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
    },
    input: {
        display: 'none',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const CreateProduct = ({ backStep, productEdit, addNewItems,
    handleCurrentPage, addNewCategory, uploadStart,
    uploadSuccess, isUploading }) => {

    const classes = useStyles();
    const theme = useTheme();

    const [product, setProduct] = useState({ brand: '', category: '', genre: '', itemsQuantity: 1 })
    let [items, setItems] = useState([{ image: [], name: '', price: 0, detail: '', tallas: [] }])
    let [itemschips, setItemsChip] = useState([{ chips: [] }])
    const [categories, setCategories] = useState([]);
    const [tallas, setTallas] = useState([]);

    useEffect(() => {

        if (productEdit.category) {
            console.log("enter" , productEdit.category);
            const prendasRef = firestore.collection('genre').doc(productEdit.genre)
            prendasRef.get().then(doc => {
                const { prendas } = doc.data();
                const valuesPrendas = Object.keys(prendas).map(prenda =>
                    ({ name: prendas[prenda].name.toLowerCase(), talla: prendas[prenda].talla })
                )
                // console.log(valuesPrendas);
                setCategories(valuesPrendas)
                const categoryObjectSelected = valuesPrendas.find(category => category.name === productEdit.category)
                setTallas(categoryObjectSelected.talla)
            })

        } else
            fetchCategoriesByGenre(productEdit.genre)


    }, [])

    const handleInputs = (e) => {
        const { name, value } = e.target;

        if (name === 'itemsQuantity') {
            items = []
            itemschips = []
            for (let index = 0; index < value; index++) {
                items.push({ id: index, image: [], name: '', price: 0, detail: '', tallas: [] })
                itemschips.push({ chips: [] })
            }
            setItems([...items])
            setItemsChip([...itemschips]);

        } else
            setProduct({ ...product, [name]: value });
    }

    const fetchCategoriesByGenre = (genre) => {
        const prendasRef = firestore.collection('genre').doc(genre)
        prendasRef.get().then(doc => {
            const { prendas } = doc.data();
            const valuesPrendas = Object.keys(prendas).map(prenda =>
                ({ name: prendas[prenda].name, talla: prendas[prenda].talla })
            )

            console.log(valuesPrendas);

            setCategories(valuesPrendas)

        })
    }

    const handleSelectGenre = (e) => {
        const { name, value } = e.target;
        fetchCategoriesByGenre(value)
        setProduct({ ...product, [name]: value });
    }

    const handleSelectCategory = (e) => {
        const { name, value } = e.target;
        const categoryObjectSelected = categories.find(category => category.name === value)
        setTallas(categoryObjectSelected.talla)
        setProduct({ ...product, [name]: value });

    }

    const handleItems = (e, indexChange) => {
        const { name, value } = e.target;

        let objectChanged = { ...items[indexChange] };
        let objectItemChip = { ...itemschips[indexChange] };

        if (name === 'image') {
            console.log(e.target.files);
            if (e.target.files.length > 0) {
                for (let index = 0; index < e.target.files.length; index++) {
                    objectChanged['image'].push(e.target.files[index]); //[...objectChanged.image , e.target.files[0]] ;
                    objectItemChip['chips'].push(e.target.files[index].name);
                }
                items[indexChange] = objectChanged;
                itemschips[indexChange] = objectItemChip;
                setItems([...items])
                setItemsChip([...itemschips]);
            }
        } else {
            objectChanged[name] = value;
            items[indexChange] = objectChanged;
            setItems([...items])
        }
        console.log({ itemschips });
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log({ product });
        console.log({ items });
        uploadStart()
        const uploadedItemsImages = await uploadImages(items, product.category);
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

    const handleDeleteChipsImages = (e, indexKey) => {
        console.log("deleting");
    }

    return (

        <div>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        Registro de Productos
          </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id={`select-genre`}> Genero</InputLabel>
                                    <Select
                                        labelId={`select-genre`}
                                        id={`genre`}
                                        value={productEdit !== "" ? productEdit.genre : product.genre}
                                        name="genre"
                                        onChange={handleSelectGenre}
                                    // defaultValue={productEdit ? productEdit.genre : null}
                                    >

                                        <MenuItem value="hombre">Hombre</MenuItem>
                                        <MenuItem value="mujer">Mujer</MenuItem>

                                        {/* {geners.map((genre, i) => (
                                            <MenuItem key={i} value={genre.id}>{genre.value}</MenuItem>
                                        ))} */}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id={`select-category`}> Cateogria</InputLabel>
                                    <Select
                                        labelId={`select-category`}
                                        id={`category`}
                                        // value={product.category}
                                        value={productEdit !== "" ? productEdit.category : product.category}
                                        name="category"
                                        onChange={handleSelectCategory}
                                    >
                                        {categories.map((category, i) => (
                                            <MenuItem key={i} value={category.name.toLowerCase()}>{category.name.toLowerCase()}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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

            <Container component="main" maxWidth="lg">
                <div className={classes.paper}>
                    {items.map((item, index) => {
                        return (
                            <Grid key={index} container spacing={2}>
                                <Grid item xs={12} sm={2}>
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
                                        onChange={(e) => handleItems(e, index)}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id={`detail_${index}`}
                                        label="Descripcion"
                                        name="detail"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Box>
                                        <input
                                            accept="image/*"
                                            className={classes.input}
                                            id={`contained-button-file_${index}`}
                                            onChange={(e) => handleItems(e, index)}
                                            name="image"
                                            type="file"
                                            multiple
                                        />
                                        <label htmlFor={`contained-button-file_${index}`}>
                                            <Button variant="contained" size="small" color="primary"
                                                startIcon={<CloudUpload />}
                                                component="span">
                                                Subir Imagen
                                             </Button>
                                        </label>
                                        <Box display="flex">
                                            {itemschips[index]['chips'].map((name, i) => (
                                                <Chip key={i}
                                                    label={name}
                                                    onDelete={(e) => handleDeleteChipsImages(e, index)}
                                                />
                                            ))
                                            }
                                        </Box>
                                    </Box>

                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id={`select-talla_${index}`}>Talla</InputLabel>
                                        <Select
                                            labelId={`select-talla_${index}`}
                                            id={`tallas_${index}`}
                                            name="tallas"
                                            multiple
                                            value={item.tallas}
                                            onChange={(e) => handleItems(e, index)}
                                            input={<Input id={`select-talla_${index}`} />}
                                            renderValue={(selected) => (
                                                <div className={classes.chips}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} className={classes.chip} />
                                                    ))}
                                                </div>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {tallas.map((talla) => (
                                                <MenuItem key={talla} value={talla} style={getStyles(talla, talla, theme)}>
                                                    {talla}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={2}>
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
                                // fullWidth
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
                        // fullWidth
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
    isUploading: isUploadinSelector(state)
})

export default connect(mapStateToProps, mapDispatchToState)(CreateProduct);
