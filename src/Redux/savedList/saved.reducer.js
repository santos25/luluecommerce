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
        savedItems: addUniqueitemToList(state.savedItems, action.payload),
      };
    case SavedType.REMOVE_ITEM_SAVED_LIST:
      return {
        ...state,
        savedItems: state.savedItems.filter(
          (item) => item.name !== action.payload.name
        ),
      };
    default:
      return state;
  }
};

export default SavedReducer;
