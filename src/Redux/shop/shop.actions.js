import shop_types from "./shop.types";
// import TEMPDATA from './tempdata';

import { firestore } from "../../FireBase/FireBaseUtil";

const fetchingCategoriesSucces = (collections) => {
  return {
    type: shop_types.FETCHING_CATEGORIES_SUCCESS,
    payload: collections,
  };
};

const fetchingCollectionsSucces = (collections) => {
  return {
    type: shop_types.FETCHING_COLLECTIONS_SUCCESS,
    payload: collections,
  };
};

const fetchingCollectionStart = () => {
  return {
    type: shop_types.FETCHING_COLLECIONS_START,
  };
};

// const fetchingCollectionFailed = (error) => {
//     return {
//         type: shop_types.FETCHING_COLLECTIONS_FAILED,
//         payload: error
//     }
// }

export const fetchingCollectionsOverViewAsync = (genre) => {
  return (dispatch) => {
    dispatch(fetchingCollectionStart());

    const docRef = firestore.collection("genre").doc(genre);

    docRef.get().then((document) => {
      const collections = { ...document.data() };
      dispatch(fetchingCategoriesSucces(collections));
    });
  };
};

export const fetchingCollectionsAsync = (genre, collectionId) => {
  return (dispatch) => {
    console.log("fetching collections Async");
    dispatch(fetchingCollectionStart());

    const collecRef = firestore
      .collection("collections")
      .where("genre", "==", genre);
    collecRef.get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const collCategRef = doc.ref
          .collection("categories")
          .where("name", "==", collectionId);

        collCategRef.get().then((snapshot) => {
          snapshot.docs.forEach((docCateg) => {
            dispatch(fetchingCollectionsSucces(docCateg.data().products));
          });
        });
      });
    });
  };
};
