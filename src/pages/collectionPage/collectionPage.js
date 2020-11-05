import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { dataCollectionSelector } from "../../Redux/shop/shop.selectors";
import CardImages from "../../components/CardImages/CardImages";
// import './collection.styles.css';

//firebase
import { firestore } from "../../FireBase/FireBaseUtil";

import { Grid, Typography } from "@material-ui/core";

const CollectionPage = ({ match, ...rest }) => {
  const [collections, setCollections] = useState([]);

  const { tagid, collectionId } = match.params;

  console.log(rest);
  useEffect(() => {
    const collecRef = firestore
      .collection("collections")
      .where("genre", "==", tagid);
    collecRef.get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const collCategRef = doc.ref
          .collection("categories")
          .where("name", "==", collectionId);

        collCategRef.get().then((snapshot) => {
          snapshot.docs.forEach((docCateg) => {
            setCollections(docCateg.data().products);
          });
        });
      });
    });
  }, [tagid, collectionId]);

  console.log(collections);
  return (
    <Grid>
      <Grid xs={12} item>
        <Typography variant="h5">{collectionId}</Typography>
      </Grid>
      <Grid container>
        {collections.map((item, i) => (
          <Grid key={i} xs={6} sm={3} item>
            <CardImages
              key={i}
              item={item}
              renderActions={true}
              iconFav={true}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  // itemscollection: dataCollectionSelector(ownProps.match.params.collectionId, ownProps.tagId)(state)
});

export default connect(null, null)(CollectionPage);
