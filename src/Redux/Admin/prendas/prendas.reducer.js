import PRENDAS_TYPES from './prendas.type';

const INITIAL_STATE = {
    tallas : []
}

const prendasReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PRODUCT_TYPE.FETCHING_PRODUCTS_START:
            return {
                ...state,
                tallas: action.payload
            }
      
        default:
            return state;

    }
}

export default prendasReducer;