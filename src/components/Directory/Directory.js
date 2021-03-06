import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

//selectors
import {
  categorySelector,
  newCollectionSelector,
} from "../../Redux/directory/directory.selectors";
import { landscapeImageSelector } from "../../Redux/shop/shop.selectors";
//actions
import {
  loadDirectory,
  loadNewCollection,
} from "../../Redux/directory/directory.action";
import { fetchingCollectionsAsync } from "../../Redux/shop/shop.actions";
//firebase
import { firestore } from "../../FireBase/FireBaseUtil";
//components
import Header from "../../components/Header/Header";
import SlickCollection from "../SlickCollection/SlickCollection";

// import { StarBorderTwoTone } from '@material-ui/icons'

import {
  Box,
  Typography,
  makeStyles,
  GridListTileBar,
  GridList,
  GridListTile,
  // IconButton
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
    width: "auto",
    // height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  gridListTitle: {
    cursor: "Pointer",
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "white",
  },
  image: {
    backgroundPosition: "center",
    backgroundSize: "200px 100px",
  },
}));

const Directory = ({
  categoryCollection,
  loadDirectory,
  loadNewCollection,
  newCollection,
  loadallCollections,
  imageHeader,
}) => {
  // console.log(newCollection);
  // console.log({imageHeader});
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    console.log("Fetching Directory Data");
    const docRef = firestore.collection("genre").doc("mujer");
    docRef.get().then((document) => {
      // const docuResult = document.data();
      // console.log(document.data());
      loadDirectory(document.data());
    });

    const collectionRef = firestore.collection("collections");
    collectionRef.get().then((snapshot) => {
      loadallCollections(
        snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }))
      );

      const allNewCollection = [];
      snapshot.docs.forEach((document) => {
        Object.keys(document.data().categories).forEach((category) => {
          Object.keys(document.data().categories[category]).forEach(
            (itemKey) => {
              allNewCollection.push({
                ...document.data().categories[category][itemKey],
                categoryid: category,
                genreid: document.data().genre,
              });
            }
          );
        });
      });

      // console.log(allNewCollection);
      allNewCollection.sort(function (x, y) {
        return y.createdt.toDate() - x.createdt.toDate();
      });
      loadNewCollection(allNewCollection);
    });
  }, [loadDirectory, loadNewCollection, loadallCollections]);

  const handleCategory = (collection) => {
    console.log(collection);
    history.push(`${collection.id}/${collection.name.toLowerCase()}`);
  };

  return (
    <Box>
      <Header image={imageHeader} />
      <Box mt={6} mb={2} display="flex" justifyContent="center">
        <Typography variant="h5">COLECCIONES</Typography>
      </Box>
      <Box p={2}>
        <div className={classes.root}>
          <GridList
            cellHeight={200}
            spacing={10}
            cols={4}
            className={classes.gridList}
          >
            {categoryCollection &&
              categoryCollection.map((collection, i) => (
                <GridListTile
                  className={classes.gridListTitle}
                  key={i}
                  cols={2}
                  rows={2}
                  onClick={() => handleCategory(collection)}
                >
                  <img
                    className={classes.image}
                    src={collection.image}
                    alt=""
                  />
                  <GridListTileBar
                    title={collection.name.toUpperCase()}
                    titlePosition="top"
                    // actionIcon={
                    //     <IconButton aria-label={`star ${collection.items[0].name}`} className={classes.icon}>
                    //         <StarBorderTwoTone />
                    //     </IconButton>
                    // }
                    actionPosition="left"
                    className={classes.titleBar}
                  />
                </GridListTile>
              ))}
          </GridList>
        </div>
      </Box>
      {/*  */}
      <Box mt={4} mb={2} ml={2}>
        <Typography variant="h5">New Colecciones</Typography>
        <SlickCollection collections={newCollection} tagId="" />
      </Box>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  categoryCollection: categorySelector,
  newCollection: newCollectionSelector,
  imageHeader: landscapeImageSelector("mujer"),
});

const mapDispatchToState = (dispatch) => ({
  loadDirectory: (items) => dispatch(loadDirectory(items)),
  loadNewCollection: (items) => dispatch(loadNewCollection(items)),
  loadallCollections: (collections) =>
    dispatch(fetchingCollectionsAsync(collections)),
});

export default connect(mapStateToProps, mapDispatchToState)(Directory);
