import React, { useEffect } from "react";
import { connect } from "react-redux";

//selectors
import {
  dataCollectionSelector,
  isLoadingCollections,
} from "../../Redux/shop/shop.selectors";

//actions
import { fetchingCollectionsAsync } from "../../Redux/shop/shop.actions";

//components
import CardImages from "../../components/CardImages/CardImages";

//firebase

//material UI
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
  const classes = useStyles();

  const { tagid, collectionId } = match.params;
  console.log(collections);
  useEffect(() => {
    console.log("render new  Collection page");
    fetchCollections(tagid, collectionId);
  }, [tagid, collectionId, fetchCollections]);

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
