import directoryTypes from './directory.types';
import TEMPDATA from './tempdata';
const INITIAL_STATE = {
    discountItems: TEMPDATA
}

const directoryReducer = (state = INITIAL_STATE , action) => {
    switch (action.type) {
        case directoryTypes.LOAD_DISCOUNT_CLOTHES:
            return {
                ...state,
                discountItems : action.payload
            }
        default:
            return state
    }
}

export default directoryReducer;