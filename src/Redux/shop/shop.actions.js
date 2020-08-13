import shop_types from './shop.types';
// import TEMPDATA from './tempdata';

import { convertCollectionsToObjects, firestore, createCollectionAndDocuments } from '../../FireBase/FireBaseUtil';

const fetchingCollectionSucces = (collections) => {
    return {
        type: shop_types.FETCHING_COLLECTIONS_SUCCESS,
        payload: collections
    }
}

const fetchingCollectionStart = () => {
    return {
        type: shop_types.FETCHING_COLLECIONS_START
    }
}

const fetchingCollectionFailed = (error) => {
    return {
        type: shop_types.FETCHING_COLLECTIONS_FAILED,
        payload: error
    }
}

export const fetchingCollectionsAsync = (collections) => {
    return (dispatch) => {
        // const collectionRef = firestore.collection('collections').where('genre', '==', genre);

        // dispatch(fetchingCollectionStart());

        /*  collectionRef.get().then(snapShot => {
             snapShot.docs.forEach(document => {
                 dispatch(fetchingCollectionSucces({ id: document.id , ...document.data()}))
             })
         }) */
        dispatch(fetchingCollectionSucces(collections))
    }
}