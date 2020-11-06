import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addItemsToCart } from "../../Redux/Cart/cart.action";

//reac-router
import { useRouteMatch } from "react-router-dom";
//selectors
import {
  dataProductDetailSelector,
  categoriesSelector,
} from "../../Redux/shop/shop.selectors";

//firebase
import { firestore } from "../../FireBase/FireBaseUtil";

//components
import Slider from "react-slick";
import NextArrow from "../SlickArrows/NextArrow";
import PreviewArrow from "../SlickArrows/PreviewArrow";
import SlickCollection from "../SlickCollection/SlickCollection";

import {
  Done as DoneIcon,
  FavoriteBorder as FavoriteBorderIcon,
  AddShoppingCart as AddShopIcon,
} from "@material-ui/icons";
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

const ProductDetail = ({ product, addItemsToCart, categories }) => {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [talla, setTalla] = useState("");

  const classes = useStyles();
  let match = useRouteMatch();
  // console.log(suggestedProducts);

  useEffect(() => {
    const pickedCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const pickedProduct =
      pickedCategory[Math.floor(Math.random() * pickedCategory.length)];

    const collecRef = firestore
      .collection("collections")
      .where("genre", "==", match.params.tagid);
    collecRef.get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const collCategRef = doc.ref
          .collection("categories")
          .where("name", "==", pickedProduct.name);

        collCategRef.get().then((snapshot) => {
          snapshot.docs.forEach((docCateg) => {
            setSuggestedProducts(docCateg.data().products);
          });
        });
      });
    });
  }, [categories]);

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

  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Slider {...settings}>
          {product.images.map((url, indexColl) => (
            // <GridListTile key={indexColl} cols={2} rows={2}>
            <img key={indexColl} src={`http://${url}`} alt="" />
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
        <Box display="flex" justifyContent="space-between" mt={2} p={1}>
          <Button
            startIcon={<AddShopIcon />}
            variant="contained"
            color="primary"
            fullWidth
            size="small"
            onClick={() => addItemsToCart(product)}
          >
            añadir a mi bolsa
          </Button>
          <IconButton color="primary" aria-label="Favoritet">
            <FavoriteBorderIcon fontSize="large" />
          </IconButton>
        </Box>
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
          <Typography variant="h6" className={classes.bold} color="">
            PUEDE QUE TAMBIÉN TE GUSTE
          </Typography>
          <Box>
            <SlickCollection collections={suggestedProducts} />
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
  categories: categoriesSelector()(state),
});
export default connect(mapStateToProps, mapDispatchToState)(ProductDetail);
