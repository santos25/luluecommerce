import shop_types from "./shop.types";
// import TEMPDATA from './tempdata';

import { firestore } from "../../FireBase/FireBaseUtil";

const fetchingCollectionSucces = (collections) => {
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

export const fetchingCollectionsAsync = (genre) => {
  return (dispatch) => {
    dispatch(fetchingCollectionStart());

    const docRef = firestore.collection("genre").doc(genre);

    docRef.get().then((document) => {
      const collections = { ...document.data() };
      dispatch(fetchingCollectionSucces(collections));
    });

    // collectionRef.get().then((snapShot) => {
    //   snapShot.docs.forEach((doc) => {
    //     const categoriesRef = doc.ref.collection("categories").limit(4);
    //     categoriesRef.get().then((snapShot) => {
    //       const categories = snapShot.docs.map((categoryDoc) => ({
    //         id: categoryDoc.id,
    //         ...categoryDoc.data(),
    //       }));
    //       const collection = {
    //         id: doc.id,
    //         ...doc.data(),
    //         categories: categories,
    //       };
    //       dispatch(fetchingCollectionSucces(collection));
    //     });
    //   });
    // });
  };
};
