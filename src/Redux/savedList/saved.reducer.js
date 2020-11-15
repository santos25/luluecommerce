import SavedType from "./saved.types";
import { addUniqueitemToList } from "./saved-utils";

const INITIAL_SATE = {
  hidden: true,
  savedItems: [],
};

const SavedReducer = (state = INITIAL_SATE, action) => {
  switch (action.type) {
    case SavedType.TOGGLE_SAVED_LIST:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case SavedType.ADDITEMS_TO_SAVED_LIST:
      return {
        ...state,
        // cartitems: addUniqueitemTocart(state.cartitems, action.payload),
        savedItems: addUniqueitemToList(state.savedItems, action.payload),
      };
    case SavedType.REMOVE_ITEM:
      return {
        ...state,
        savedItems: action.payload,

        // cartitems: clearItemfromCart(state.cartitems, action.payload),
      };
    default:
      return state;
  }
};

export default SavedReducer;
