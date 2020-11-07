import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  dataCollectionSelector,
  isLoadingCollections,
  categoriesSelector,
} from "../../Redux/shop/shop.selectors";
import {
  fetchingCollectionsAsync,
  fetchingSuggestedCollectionsAsync,
} from "../../Redux/shop/shop.actions";
import CardImages from "../../components/CardImages/CardImages";

//firebase
import { firestore } from "../../FireBase/FireBaseUtil";

import {
  Box,
  Grid,
  Typography,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  filtering: {
    backgroundColor: "#eee",
  },
}));

const CollectionPage = ({
  isLoading,
  collections,
  match,
  fetchCollections,
}) => {
  // const [collections, setCollections] = useState([]);
  const classes = useStyles();

  const { tagid, collectionId } = match.params;
  console.log("collection Page");
  useEffect(() => {
    console.log("render new  Collection page");
    // const pickedCategory =
    //   categories[Math.floor(Math.random() * categories.length)];
    // const pickedProduct =
    //   pickedCategory[Math.floor(Math.random() * pickedCategory.length)];

    fetchCollections(tagid, collectionId);
    // fetchSuggestedCollections(tagid, pickedProduct.name);
  }, [tagid, collectionId]);

  // console.log(collections);
  // console.log(isLoading);
  return (
    <Grid>
      <Grid component={Box} textAlign="center" xs={12} py={1} item>
        <Typography variant="h5">{collectionId}</Typography>
      </Grid>
      <Grid item>
        <Box py={1} textAlign="center" className={classes.filtering}>
          <Typography variant="subtitle1">FILTRAR</Typography>
        </Box>
      </Grid>

      <Grid container>
        {isLoading ? (
          <CircularProgress />
        ) : (
          collections.products
            .filter((_, index) => index < 10)
            .map((item, i) => (
              <Grid key={i} xs={6} sm={3} item>
                <CardImages
                  key={i}
                  item={item}
                  typeCollection={collections.type}
                  renderActions={false}
                  iconFav={true}
                />
              </Grid>
            ))
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isLoading: isLoadingCollections(state),
  collections: dataCollectionSelector()(state),
  // categories: categoriesSelector()(state),
});

const mapDispatchToState = (dispatch) => ({
  fetchCollections: (genre, collectionId) =>
    dispatch(fetchingCollectionsAsync(genre, collectionId)),
});

export default connect(mapStateToProps, mapDispatchToState)(CollectionPage);
