import React from "react";
import { connect } from "react-redux";

import { useHistory, useRouteMatch } from "react-router-dom";

//selectors
import {
  categoriesSelector,
  landscapeImageSelector,
} from "../../Redux/shop/shop.selectors";

//components
import Header from "../Header/Header";
import Categories from "./Categories";

import {
  Box,
  makeStyles,
  Typography,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Grid,
} from "@material-ui/core";

import { Info } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({}));

const CollectionOverview = ({ categories, imageHeader, tagId }) => {
  let history = useHistory();
  let match = useRouteMatch();

  const classes = useStyles();
  console.log(categories);
  // console.log(collections);
  // console.log(tagId);

  return (
    <Box>
      <Header image={imageHeader} />
      <Box mt={1}>
        <Categories data={categories} />
      </Box>
      {/* <Box mt={4} mb={2} ml={2}>
        <Typography variant="h5"> Prendas Recomendadas </Typography>
        <SlickCollection collections={suggestedCollection} tagId={tagId} />
      </Box> */}
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => ({
  categories: categoriesSelector()(state),
  // suggestedCollection: suggestedCollectionsSelector(ownProps.tagId)(state),
  imageHeader: landscapeImageSelector()(state),
});

export default connect(mapStateToProps)(CollectionOverview);
