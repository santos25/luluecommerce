import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

//firebase
import { firestore } from "../../FireBase/FireBaseUtil";

//selectors
import {
  categoriesSelector,
  landscapeImageSelector,
  dataSuggestedCollectionSelector,
  isLoadingSuggestedCollections,
} from "../../Redux/shop/shop.selectors";

//actions
import { fetchingSuggestedCollectionsAsync } from "../../Redux/shop/shop.actions";

//components
import Header from "../Header/Header";
import Categories from "./Categories";
import SlickCollection from "../SlickCollection/SlickCollection";
import WithSpinner from "../with-spinner/withSpinner";
//material UI
import { Box, Button, makeStyles, Typography } from "@material-ui/core";

import { WhatsApp as WhatsappIcon } from "@material-ui/icons";

const SlickCollectionWitSpinner = WithSpinner(SlickCollection);

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
}));

const CollectionOverview = ({
  categories,
  imageHeader,
  fetchSuggestedCollections,
  tagId,
  suggestedCollections,
  isLoading,
}) => {
  useEffect(() => {
    const pickedCategory = Object.keys(categories).map(
      (key) => categories[key]
    )[Math.floor(Math.random() * Object.keys(categories).length)];
    const pickedProduct =
      pickedCategory[Math.floor(Math.random() * pickedCategory.length)];

    fetchSuggestedCollections(tagId, pickedProduct.name);
  }, []);
  const classes = useStyles();

  return (
    <Box>
      <Header image={imageHeader} />
      <Box mt={1}>
        <Categories categories={categories} />
      </Box>
      <Box my={2} px={1}>
        <Typography variant="h6" className={classes.bold}>
          Ofertas del Dia
        </Typography>
        <Box>
          <SlickCollectionWitSpinner
            isLoading={isLoading}
            collections={suggestedCollections}
          />{" "}
        </Box>
      </Box>
      <Box mt={6} mb={4} px={1}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          // border={1}
          // borderColor="primary.main"
          p={1}
          // borderRadius={16}
          // width={}
        >
          <Button
            startIcon={<WhatsappIcon fontSize="large" />}
            variant="contained"
            size="large"
            color="primary"
          >
            Ventas Whatsapp
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => ({
  categories: categoriesSelector()(state),
  // suggestedCollection: suggestedCollectionsSelector(ownProps.tagId)(state),
  imageHeader: landscapeImageSelector()(state),
  suggestedCollections: dataSuggestedCollectionSelector()(state),
  isLoading: isLoadingSuggestedCollections(state),
});
const mapDispatchToState = (dispatch) => ({
  fetchSuggestedCollections: (genre, collectionId) =>
    dispatch(fetchingSuggestedCollectionsAsync(genre, collectionId)),
});

export default connect(mapStateToProps, mapDispatchToState)(CollectionOverview);
