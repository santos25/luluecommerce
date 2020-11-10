import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addItemsToCart } from "../../Redux/Cart/cart.action";
// import {  } from "../../Redux/shop/shop.actions";

//reac-router
import { useRouteMatch } from "react-router-dom";
//selectors
import {
  dataProductDetailSelector,
  categoriesSelector,
  dataSuggestedCollectionSelector,
  isLoadingSuggestedCollections,
} from "../../Redux/shop/shop.selectors";

//firebase
import { firestore } from "../../FireBase/FireBaseUtil";

//components
import Slider from "react-slick";
import NextArrow from "../SlickArrows/NextArrow";
import PreviewArrow from "../SlickArrows/PreviewArrow";
import SlickCollection from "../SlickCollection/SlickCollection";
import WithSpinner from "../with-spinner/withSpinner";

import {
  Done as DoneIcon,
  FavoriteBorder as FavoriteBorderIcon,
  AddShoppingCart as AddShopIcon,
} from "@material-ui/icons";

import { Alert } from "@material-ui/lab";
import {
  makeStyles,
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
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

const SlickCollectionWitSpinner = WithSpinner(SlickCollection);

const ProductDetail = ({
  product,
  addItemsToCart,
  categories,
  suggestedCollections,
  fetchSuggestedCollections,
  isLoading,
}) => {
  const [talla, setTalla] = useState("");
  const [tallaError, setTallaError] = useState(null);
  const [productAdded, setProductAdded] = useState(null);

  const classes = useStyles();
  let match = useRouteMatch();
  console.log({ product });

  useEffect(() => {
    console.log("PRODUCT DETAIL");
    // const pickedCategory =
    //   categories[Math.floor(Math.random() * categories.length)];
    // const pickedProduct =
    //   pickedCategory[Math.floor(Math.random() * pickedCategory.length)];

    // fetchSuggestedCollections(match.params.tagid, pickedProduct.name);
  }, [match.params.productId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreviewArrow />,
  };

  const settingsSuggestions = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreviewArrow />,
  };
  // console.log(categories);

  const handleTalla = (event) => {
    console.log(event.target);
    setTalla(event.target.value);
  };

  const createDescriptionHtml = () => {
    return { __html: product.description };
  };

  const addToTheCart = (product) => {
    if (talla !== "") {
      addItemsToCart({ ...product, selectedTalla: talla });
      setTallaError(null);
      setProductAdded("¡Ya te lo guardamos en tu bolsa!");
    } else {
      setTallaError("Ingrese Talla del producto");
    }
  };
  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Slider {...settings}>
          {product.images.map((url, indexColl) => (
            <img key={indexColl} src={`http://${url}`} alt="" />
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
            <FormControl required variant="filled" fullWidth>
              <InputLabel id="select-talla">Selecciona tu talla</InputLabel>
              <Select
                required
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
            {tallaError && <Alert severity="error">{tallaError}</Alert>}
          </Box>
        </Box>
      </Grid>
      <Grid xs={12} item>
        <Box display="flex" justifyContent="space-between" mt={2} p={1}>
          <Button
            startIcon={<AddShopIcon />}
            variant="contained"
            color="primary"
            fullWidth
            size="small"
            onClick={() => addToTheCart(product)}
          >
            añadir a mi bolsa
          </Button>
          <IconButton color="primary" aria-label="Favoritet">
            <FavoriteBorderIcon fontSize="large" />
          </IconButton>
        </Box>
        {productAdded && <Alert severity="success">{productAdded}</Alert>}
      </Grid>
      <Grid xs={12} item>
        <Box mt={3} p={1}>
          <Typography variant="h6" className={classes.bold}>
            DETALLES DEL PRODUCTO
          </Typography>
          <div dangerouslySetInnerHTML={createDescriptionHtml()} />;
        </Box>
      </Grid>

      <Grid xs={12} item>
        <Box my={4} p={1}>
          <Typography variant="h6" className={classes.bold}>
            PUEDE QUE TAMBIÉN TE GUSTE
          </Typography>
          <Box>
            {/* {console.log(isLoading)} */}
            <SlickCollectionWitSpinner
              isLoading={isLoading}
              collections={suggestedCollections}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

const mapDispatchToState = (dispatch) => ({
  addItemsToCart: (item) => {
    dispatch(addItemsToCart(item));
  },
});

const mapStateToProps = (state, ownProps) => ({
  product: dataProductDetailSelector(ownProps.match.params.productId)(state),
  // categories: categoriesSelector()(state),
  suggestedCollections: dataSuggestedCollectionSelector()(state),
  isLoading: isLoadingSuggestedCollections(state),
});
export default connect(mapStateToProps, mapDispatchToState)(ProductDetail);
