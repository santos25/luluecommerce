import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addItemsToCart } from '../../Redux/Cart/cart.action';

//selectors
import { dataProductDetailSelector } from '../../Redux/shop/shop.selectors'
import { newCollectionsHomeSelector } from '../../Redux/directory/directory.selectors'

//components
import SlickCollection from '../SlickCollection/SlickCollection'
import { Done } from '@material-ui/icons'
import {
    GridList,
    GridListTile,
    makeStyles,
    Box,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button

} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 800,
        // height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    productDetail: {
        margin: theme.spacing(2)
    }
}));

const ProductDetail = ({ product, addItemsToCart }) => {
    const classes = useStyles();

    const [talla, setTalla] = useState('')
    // console.log(newCollections);

    const handleTalla = (event) => {
        console.log(event.target);
        setTalla(event.target.value)
    }

    return (
        // <div className={classes.root}>
        <Grid container >
            <Grid item xs={12} sm={8}>
                <div className={classes.root}>
                    <GridList cellHeight={200} spacing={4} cols={4} className={classes.gridList}>
                        {product.image.map((image, i) => (
                            <GridListTile key={i} cols={2} rows={2}>
                                <img src={image} alt="" />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </Grid>
            <Grid item xs={12} sm={4} >
                <Box height="100%" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="stretch" mt={4}>
                    <Box display="flex" justifyContent="space-between" m={2}>
                        {/* <Grid container > */}
                        {/* <Grid item container xs display="flex" direction="row" justify="space-between" > */}
                        <Typography variant="h5" component="h6">
                            {product.name}
                        </Typography>
                        <Typography variant="h5" component="h6">
                            {`$${product.price}`}
                        </Typography>
                        {/* </Grid> */}
                        {/* </Grid> */}

                    </Box>
                    <Box m={2}>
                        <FormControl fullWidth>
                            <InputLabel id="select-talla">Selecciona tu talla</InputLabel>
                            <Select
                                labelId="select-talla"
                                id="talla"
                                value={talla}
                                name="talla"
                                onChange={handleTalla}
                            >
                                {
                                    product.tallas.map((talla,i) => <MenuItem key={i} value={talla}>{talla}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box m={2}>
                        <Button variant="outlined" color="primary" fullWidth onClick={() => addItemsToCart(product)}>
                            Añadir al carrito
                    </Button>
                    </Box>
                    <Box m={2} display="flex">
                        <Done />
                        <Typography component="h6">
                            Envio Gratis
                    </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box p={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
                    <Typography variant="body1" component="h5" >
                        Detalles del Producto
                    </Typography>
                    <Typography variant="body2" component="p">
                        {product.detail}
                    </Typography>
                </Box>

            </Grid>
            <Grid item xs={12}>
                <Box mt={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Typography variant="body1" component="h5" >
                        RECOMENDACIONES
                    </Typography>
                    {/* <SlickCollection collections={newCollections[0].items} /> */}
                </Box>
            </Grid>

        </Grid>
    )
}

const mapDispatchToState = (dispatch) => ({
    addItemsToCart: (item) => { dispatch(addItemsToCart(item)) }
})

const mapStateToProps = (state, ownProps) => ({
    product: dataProductDetailSelector(ownProps.match.params.collectionId, ownProps.match.params.productId , ownProps.tagId)(state)
    // newCollections: newCollectionsHomeSelector(state)

})
export default connect(mapStateToProps, mapDispatchToState)(ProductDetail)
