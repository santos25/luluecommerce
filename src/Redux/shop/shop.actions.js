import shop_types from './shop.types';
import {convertCollectionsToObjects , firestore} from '../../FireBase/FireBaseUtil';

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

export const fetchingCollectionsAsync = () => {
    return (dispatch) => {
        const collectionRef = firestore.collection('collections');

        dispatch(fetchingCollectionStart());

        collectionRef.get().then(snapShot => {
            let dataShopCollections = convertCollectionsToObjects(snapShot);
            dispatch(fetchingCollectionSucces(dataShopCollections));
        }).catch(error => dispatch(fetchingCollectionFailed(error)));
    }
}