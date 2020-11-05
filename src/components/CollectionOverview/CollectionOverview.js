import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

//firebase
import { firestore } from "../../FireBase/FireBaseUtil";

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
import { Box, Button, makeStyles, Typography } from "@material-ui/core";

import { WhatsApp as WhatsappIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
}));

const CollectionOverview = ({ categories, imageHeader, tagId }) => {
  const [productToday, setProductToday] = useState([]);

  useEffect(() => {
    const selectedCategory = categories[Math.floor(Math.random() * 3)];
    console.log(selectedCategory);
    const collecRef = firestore
      .collection("collections")
      .where("genre", "==", tagId);
    collecRef.get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const collCategRef = doc.ref
          .collection("categories")
          .where("name", "==", selectedCategory[0].name);

        collCategRef.get().then((snapshot) => {
          snapshot.docs.forEach((docCateg) => {
            setProductToday(docCateg.data().products);
          });
        });
      });
    });
  }, [categories]);
  const classes = useStyles();
  // console.log(imageHeader);
  // console.log(categories);
  // console.log(productToday);

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
          <SlickCollection collections={productToday} tagId={tagId} />
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
          <WhatsappIcon fontSize="large" />
          <Button variant="contained" size="small" color="primary">
            <Typography variant="button"> Ventas Whatsapp </Typography>
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
});

export default connect(mapStateToProps)(CollectionOverview);
