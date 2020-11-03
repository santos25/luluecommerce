import React from "react";
import { connect } from "react-redux";
// import { createStructuredSelector } from 'reselect';
import { useHistory, useRouteMatch } from "react-router-dom";

import {
  dataShopSelector,
  suggestedCollectionsSelector,
  landscapeImageSelector,
} from "../../Redux/shop/shop.selectors";

//components
import SlickCollection from "../SlickCollection/SlickCollection";
import Header from "../Header/Header";

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  // gridList: {
  //     // width: 500,
  //     // height: 450,
  // },
  gridListTile: {
    cursor: "pointer",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  title: {
    marginTop: theme.spacing(5),
  },
}));

const CollectionOverview = ({
  collections,
  suggestedCollection,
  imageHeader,
  tagId,
}) => {
  let history = useHistory();
  let match = useRouteMatch();

  const classes = useStyles();
  // console.log(suggestedCollection);
  // console.log(collections);
  // console.log(tagId);

  return (
    <Box>
      <Header image={imageHeader} />
      {/* <Grid container direction="column" alignItems="center">
        <Grid xs={12} item className={classes.title}>
          <Typography variant="h5"> COLECCIONES </Typography>
        </Grid>
        <Box
          height="auto"
          width="auto"
          m={4}
          display="flex"
          justifyContent="center"
        >
          <Grid xs={12} item>
            <div className={classes.root}>
              <GridList cols={3} cellHeight={400}>
                {collections.map((collection, i) => (
                  <GridListTile
                    key={i}
                    className={classes.gridListTile}
                    onClick={() =>
                      history.push(`${match.url}/${collection.name}`)
                    }
                  >
                    <img src={collection.image} alt={collection.name} />
                    <GridListTileBar
                      title={collection.name.toUpperCase()}
                      actionIcon={
                        <IconButton
                          aria-label={`info about ${collection.category}`}
                          className={classes.icon}
                        >
                          <Info />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </Grid>
        </Box>
      </Grid> */}
      {/* <Box mt={4} mb={2} ml={2}>
        <Typography variant="h5"> Prendas Recomendadas </Typography>
        <SlickCollection collections={suggestedCollection} tagId={tagId} />
      </Box> */}
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => ({
  // collections: dataShopSelector(ownProps.tagId)(state),
  // suggestedCollection: suggestedCollectionsSelector(ownProps.tagId)(state),
  imageHeader: landscapeImageSelector(ownProps.tagId)(state),
});

export default connect(mapStateToProps)(CollectionOverview);
