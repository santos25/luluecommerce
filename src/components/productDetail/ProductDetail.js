import React, { useState } from "react";
import { connect } from "react-redux";
import { addItemsToCart } from "../../Redux/Cart/cart.action";

//selectors
import { dataProductDetailSelector } from "../../Redux/shop/shop.selectors";
// import { newCollectionsHomeSelector } from '../../Redux/directory/directory.selectors'

//components
import Slider from "react-slick";
import NextArrow from "../SlickArrows/NextArrow";
import PreviewArrow from "../SlickArrows/PreviewArrow";

import { Done as DoneIcon } from "@material-ui/icons";
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
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 800,
    // height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  productDetail: {
    margin: theme.spacing(2),
  },
  bold: {
    fontWeight: "bold",
  },
}));

const ProductDetail = ({ product, addItemsToCart }) => {
  const classes = useStyles();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreviewArrow />,
  };

  const [talla, setTalla] = useState("");
  console.log(product);

  const handleTalla = (event) => {
    console.log(event.target);
    setTalla(event.target.value);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Slider {...settings}>
          {product.images.map((url, indexColl) => (
            // <GridListTile key={indexColl} cols={2} rows={2}>
            <img src={`http://${url}`} alt="" />
            // </GridListTile>
          ))}
        </Slider>
      </Grid>
      <Grid xs={12} item>
        <Box mt={4} p={1} mb={1}>
          <Typography variant="subtitle1">{product.name}</Typography>
        </Box>
      </Grid>
      <Grid xs={12} component={Box} p={1} mb={1} item>
        <Typography variant="h6">{product.price.current.text}</Typography>
        <Box display="flex" flexDirection="row" justifyContent="flex-start">
          <DoneIcon />
          <Typography component="h6">Envio Gratis</Typography>
        </Box>
      </Grid>
      <Grid xs={12} item>
        <Box mt={2} p={1}>
          <Typography variant="subtitle1">
            {" "}
            <span className={classes.bold}> Color: </span> Negro
          </Typography>
        </Box>
      </Grid>
      <Grid xs={12} item>
        <Box mt={2} p={1}>
          <Typography variant="subtitle1">
            <span className={classes.bold}> Talla: </span>
          </Typography>
          <Box>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="select-talla">Selecciona tu talla</InputLabel>
              <Select
                labelId="select-talla"
                id="talla"
                value={talla}
                name="talla"
                onChange={handleTalla}
              >
                {product.sizes.map((size, index) => {
                  return (
                    <MenuItem key={index} value={size}>
                      {size}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Grid>
      <Grid xs={12} item>
        <Box mt={2} p={1}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => addItemsToCart(product)}
          >
            añadir a mi bolsa
          </Button>
        </Box>
      </Grid>
      {/* <Grid item xs={12} sm={4}>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="stretch"
          mt={4}
        >
          
          
          <Box m={2}>
            
          </Box>
          <Box m={2} display="flex">
           
          </Box>
        </Box>
      </Grid> */}
      {/* <Grid item xs={12}>
        <Box
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="body1" component="h5">
            Detalles del Producto
          </Typography>
          <Typography variant="body2" component="p">
            {product.detail}
          </Typography>
        </Box>
      </Grid> */}
      {/* <Grid item xs={12}>
        <Box
          mt={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="body1" component="h5">
            RECOMENDACIONES
          </Typography>
          <SlickCollection collections={newCollections[0].items} />
        </Box>
      </Grid> */}
    </Grid>
  );
};

const mapDispatchToState = (dispatch) => ({
  addItemsToCart: (item) => {
    dispatch(addItemsToCart(item));
  },
});

const mapStateToProps = (state, ownProps) => ({
  product: dataProductDetailSelector(
    // ownProps.match.params.collectionId,
    ownProps.match.params.productId
    // ownProps.tagId
  )(state),
  // newCollections: newCollectionsHomeSelector(state)
});
export default connect(mapStateToProps, mapDispatchToState)(ProductDetail);
