import SavedType from "./saved.types";

export const toggleSavedList = () => {
  return {
    type: SavedType.TOGGLE_SAVED_LIST,
  };
};

export const addItemsToSavedList = (item) => {
  console.log(item);
  return {
    type: SavedType.ADDITEMS_TO_SAVED_LIST,
    payload: item,
  };
};

export const removeItem = (itemToRemove) => {
  return {
    type: SavedType.REMOVE_ITEM,
    payload: itemToRemove,
  };
};
