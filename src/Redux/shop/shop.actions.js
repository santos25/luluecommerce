import shop_types from './shop.types';
import { convertCollectionsToObjects, firestore } from '../../FireBase/FireBaseUtil';

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

export const fetchingCollectionsAsync = (genre) => {
    return (dispatch) => {
        const collectionRef = firestore.collection('collections').where('genre', '==', genre);

        dispatch(fetchingCollectionStart());

        collectionRef.get().then(snapShot => {
            snapShot.docs.forEach(docu => {
                console.log(docu.data());
                const productosRef = docu.ref.collection('productos');
                productosRef.get().then(prodSnapshot => {
                    const collectionConverted = convertCollectionsToObjects(prodSnapshot);
                    // console.log(collectionConverted);
                    dispatch(fetchingCollectionSucces(collectionConverted)) 
                });
            })
        })
    }
}