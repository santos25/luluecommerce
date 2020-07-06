import SHOPTYPES from './shop.types';
import TEMPDATA from './tempdata';


const INITIAL_STATE = {
    dataShop: TEMPDATA,
    isFetching: false,
    errorMessage: ''

}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOPTYPES.FETCHING_COLLECIONS_START:
            return {
                ...state,
                isFetching: true
            }
        case SHOPTYPES.FETCHING_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching : false,
                dataShop: action.payload
            }
        case SHOPTYPES.FETCHING_COLLECTIONS_FAILED:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default shopReducer;