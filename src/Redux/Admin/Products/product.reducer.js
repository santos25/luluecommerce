import PRODUCT_TYPE from './product.type';

const INITIAL_STATE = {
    isFetching: true,
    isUploading: false,
    errorUpload: "",
    products: []
}

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PRODUCT_TYPE.FETCHING_PRODUCTS_START:
            return {
                ...state,
                isFetching: true
            }
        case PRODUCT_TYPE.FETCHING_PRODUCTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                products: action.payload
            }
        case PRODUCT_TYPE.UPLOADING_PRODUCTS_START:
            return {
                ...state,
                isUploading: true
            }
        case PRODUCT_TYPE.UPLOADING_PRODUCTS_FAILED:
            return {
                ...state,
                errorUpload: action.payload
            }
        case PRODUCT_TYPE.UPLOADING_PRODUCTS_SUCCESS:
            return {
                ...state,
                isUploading: false
            }
        default:
            return state;

    }
}

export default productReducer;