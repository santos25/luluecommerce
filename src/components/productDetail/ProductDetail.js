import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

//actions
import { addItemsToCart } from "../../Redux/Cart/cart.action";
import { fetchingSuggestedCollectionsAsync } from "../../Redux/shop/shop.actions";
import { addItemsToSavedList } from "../../Redux/savedList/saved.action";

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

//material UI
import {
  Done as DoneIcon,
  FavoriteBorder as FavoriteBorderIcon,
  AddShoppingCart as AddShopIcon,
} from "@material-ui/icons";

import { Alert } from "@material-ui/lab";
import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import UseStyles from "./Styles";

function AlertSnack(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SlickCollectionWitSpinner = WithSpinner(SlickCollection);

const ProductDetail = ({
  productSelected,
  addItemsToCart,
  suggestedCollections,
  isLoading,
  categories,
  fetchSuggestedCollections,
  additemToSavedList,
}) => {
  const [talla, setTalla] = useState("");
  const [tallaError, setTallaError] = useState(null);
  const [productAdded, setProductAdded] = useState(null);
  const [product, setProduct] = useState(productSelected);
  const [state, setState] = useState({
    open: false,
  });
  // const [slideIndex, setSlideIndex] = useState(0);
  const slickRef = useRef();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const classes = UseStyles();
  let match = useRouteMatch();
  // console.log({ product });
  // console.log({ suggestedCollections });
  const { tagid, productId, collectionId } = match.params;

  // console.log(match.params);
  useEffect(() => {
    console.log("PRODUCT DETAIL");
    window.scrollTo(0, 0);

    if (!product || product.name.toLowerCase() !== productId.toLowerCase()) {
      console.log("Fetching");

      const fetchProductDetail = async () => {
        // console.log(match.params.collectionId);
        const colleRef = firestore
          .collection("collections")
          .doc("kZzILXWTxyZYglE6IDLx")
          .collection("categories")
          .where("name", "==", collectionId);

        const snapshot = await colleRef.get();
        const document = snapshot.docs[0].data();
        const product = document.products.find(
          (item) => item.name.toLowerCase() === productId.toLowerCase()
        );
        setProduct(product);
      };
      fetchProductDetail();
    }
  }, [collectionId, productId, product]);

  useEffect(() => {
    // console.log(suggestedCollectionsSelected);
    if (suggestedCollections.length === 0) {
      const pickedCategory = Object.keys(categories).map(
        (key) => categories[key]
      )[Math.floor(Math.random() * Object.keys(categories).length)];
      const pickedProduct =
        pickedCategory[Math.floor(Math.random() * pickedCategory.length)];

      fetchSuggestedCollections(tagid, pickedProduct.name);
    }

    console.log(slickRef);
  }, [suggestedCollections, fetchSuggestedCollections, categories, tagid]);

  const { open } = state;

  const handleClick = () => {
    setState({ open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

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

  const AddSavedList = (item, tagid, typeCollection) => {
    console.log(item, tagid, typeCollection);
    additemToSavedList({ ...item, tagid, typeCollection });
    handleClick();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreviewArrow />,
  };

  const settingsDesktop = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // variableWidth: true,
    // adaptiveHeight: true,
    // beforeChange: (current, next) => setSlideIndex(next),
  };

  return (
    <Grid container>
      {product ? (
        <>
          <Grid item xs={12} sm={7}>
            {matches ? (
              <Slider {...settings}>
                {product.images.map((url, indexColl) => (
                  <div key={indexColl}>
                    <img key={indexColl} src={`http://${url}`} alt="" />
                  </div>
                ))}
              </Slider>
            ) : (
              <Box p={2}>
                <Slider ref={slickRef} {...settingsDesktop}>
                  {product.images.map((url, indexColl) => (
                    <Box key={indexColl}>
                      <img
                        style={{ height: "500px", width: "500px" }}
                        key={indexColl}
                        src={`http://${url}`}
                        alt=""
                      />
                    </Box>
                  ))}
                </Slider>

                <Box mt={2.5}>
                  <ul className={classes.imagesSlides}>
                    {product.images.map((url, indexColl) => (
                      <li key={indexColl} className={classes.li}>
                        <img
                          onClick={() => slickRef.current.slickGoTo(indexColl)}
                          style={{ height: "90px", width: "90px" }}
                          key={indexColl}
                          src={`http://${url}`}
                          alt=""
                        />
                      </li>
                    ))}
                  </ul>
                </Box>
              </Box>
            )}
          </Grid>
          <Grid xs={12} sm={5} item>
            <Box px={3} py={2}>
              <Box mt={4} p={1} mb={1}>
                <Typography variant="subtitle1">{product.name}</Typography>
              </Box>
              <Box p={1} mb={1}>
                <Typography variant="h6">
                  {product.price.current.text}
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-start"
                >
                  <DoneIcon />
                  <Typography component="h6">Envio Gratis</Typography>
                </Box>
              </Box>
              <Box mt={2} p={1}>
                <Typography variant="subtitle1">
                  <span className={classes.bold}> Color: </span> Negro
                </Typography>
              </Box>
              <Box mt={2} p={1}>
                <Typography variant="subtitle1">
                  <span className={classes.bold}> Talla: </span>
                </Typography>
                <Box>
                  <FormControl required variant="filled" fullWidth>
                    <InputLabel id="select-talla">
                      Selecciona tu talla
                    </InputLabel>
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
                <IconButton
                  onClick={() => AddSavedList(product, tagid, collectionId)}
                  color="primary"
                  aria-label="Favoritet"
                >
                  <FavoriteBorderIcon fontSize="large" />
                </IconButton>
              </Box>
              {productAdded && <Alert severity="success">{productAdded}</Alert>}
            </Box>
          </Grid>
          <Grid xs={12} item>
            <Box mt={3} p={3}>
              <Typography variant="h6" className={classes.bold}>
                DETALLES DEL PRODUCTO
              </Typography>
              <div dangerouslySetInnerHTML={createDescriptionHtml()} />;
            </Box>
          </Grid>
        </>
      ) : (
        <CircularProgress />
      )}
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
              slidesToShow={matches ? 2 : 4}
            />
          </Box>
        </Box>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <AlertSnack onClose={handleClose} severity="success">
          Guardado!
        </AlertSnack>
      </Snackbar>
    </Grid>
  );
};

const mapDispatchToState = (dispatch) => ({
  addItemsToCart: (item) => {
    dispatch(addItemsToCart(item));
  },
  additemToSavedList: (item) => {
    dispatch(addItemsToSavedList(item));
  },
  fetchSuggestedCollections: (genre, collectionId) =>
    dispatch(fetchingSuggestedCollectionsAsync(genre, collectionId)),
});

const mapStateToProps = (state, ownProps) => ({
  categories: categoriesSelector()(state),
  productSelected: dataProductDetailSelector(ownProps.match.params.productId)(
    state
  ),
  suggestedCollections: dataSuggestedCollectionSelector()(state),
  isLoading: isLoadingSuggestedCollections(state),
});
export default connect(mapStateToProps, mapDispatchToState)(ProductDetail);
