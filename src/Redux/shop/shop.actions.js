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

const fetchingSuggestedCollectionsSucces = (collections) => {
  return {
    type: shop_types.FETCHING_SUGGESTED_COLLECTIONS_SUCCESS,
    payload: collections,
  };
};

const fetchingCollectionStart = () => {
  return {
    type: shop_types.FETCHING_COLLECIONS_START,
  };
};

const fetchingCategoriesStart = () => {
  return {
    type: shop_types.FETCHING_CATEGORIES_START,
  };
};

const fetchingSuggestedCategoriesStart = () => {
  return {
    type: shop_types.FETCHING_SUGGESTED_COLLECIONS_START,
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
    dispatch(fetchingCategoriesStart());
    console.log("fetching overview");
    const docRef = firestore.collection("genre").doc(genre);

    docRef.get().then((document) => {
      const collections = { ...document.data() };
      dispatch(fetchingCategoriesSucces(collections));
    });
  };
};

async function fetchCollections(genre, collectionId) {
  const collecRef = firestore
    .collection("collections")
    .where("genre", "==", genre);
  const snapshot = await collecRef.get();
  const collCategRef = snapshot.docs[0].ref
    .collection("categories")
    .where("name", "==", collectionId);

  const snapshotProduct = await collCategRef.get();
  return snapshotProduct.docs[0].data();
}

export const fetchingCollectionsAsync = (genre, collectionId) => {
  return async (dispatch) => {
    console.log("fetching collections Async");
    dispatch(fetchingCollectionStart());

    const result = await fetchCollections(genre, collectionId);

    dispatch(
      fetchingCollectionsSucces({
        type: result.name,
        products: result.products,
      })
    );
  };
};

export const fetchingSuggestedCollectionsAsync = (genre, collectionId) => {
  return async (dispatch) => {
    console.log("fetching Suggested collections Async");
    dispatch(fetchingSuggestedCategoriesStart());

    const result = await fetchCollections(genre, collectionId);

    dispatch(
      fetchingSuggestedCollectionsSucces({
        type: result.name,
        products: result.products,
      })
    );
  };
};
