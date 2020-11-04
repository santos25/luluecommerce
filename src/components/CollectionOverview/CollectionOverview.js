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
import SlickCollection from "../SlickCollection/SlickCollection";

//material UI
import { Box, makeStyles, Typography } from "@material-ui/core";

import { Info, WhatsApp as WhatsappIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
}));

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
        <Categories history={history} data={categories} />
      </Box>
      <Box my={2} px={1}>
        <Typography variant="h6" className={classes.bold}>
          Ofertas del Dia
        </Typography>
        <Box>
          <SlickCollection collections={categories} tagId={tagId} />
        </Box>
      </Box>
      <Box mt={6} mb={4} px={1}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box>
            <WhatsappIcon fontSize="large" />
          </Box>
          <Box border={1} borderColor="primary.main" p={1} borderRadius={16}>
            <Typography variant="button"> Ventas Whatsapp </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => ({
  categories: categoriesSelector()(state),
  // suggestedCollection: suggestedCollectionsSelector(ownProps.tagId)(state),
  imageHeader: landscapeImageSelector()(state),
});

export default connect(mapStateToProps)(CollectionOverview);
