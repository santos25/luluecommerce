import PRENDAS_TYPES from './prendas.type';
import { firestore } from '../../../FireBase/FireBaseUtil';

const fetchingStart = () => ({
    type: PRENDAS_TYPES.FETCHING_START
});

const fetchingTypeTallaSuccess = (tallas) => ({
    type: PRENDAS_TYPES.FETCHING_TALLAS_SUCCESS,
    payload: tallas
});



export const fetchingTallasAsync = () => {
    return (dispatch) => {
        const collectionsRef = firestore.collection('tallas');
        collectionsRef.get().then((snapshot) => {
            const arrayvalues = snapshot.docs.map( doc => ({ id :  doc.id , value : doc.data().name}))
            console.log(arrayvalues);
            dispatch(fetchingTypeTallaSuccess(arrayvalues))
        })
    }
}


