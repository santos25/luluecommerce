import SHOPTYPES from "./shop.types";

const INITIAL_STATE = {
  categories: [],
  collections: [],
  suggestedCollections: [],
  isFetching: true,
  isFetchingCollection: true,
  isFetchingSuggested: true,
  errorMessage: "",
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOPTYPES.FETCHING_CATEGORIES_START:
      return {
        ...state,
        isFetching: true,
      };
    case SHOPTYPES.FETCHING_COLLECIONS_START:
      return {
        ...state,
        isFetchingCollection: true,
      };
    case SHOPTYPES.FETCHING_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
      };
    case SHOPTYPES.FETCHING_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetchingCollection: false,
        collections: action.payload,
      };
    case SHOPTYPES.FETCHING_SUGGESTED_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetchingSuggested: false,
        suggestedCollections: action.payload,
      };
    case SHOPTYPES.FETCHING_COLLECTIONS_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
