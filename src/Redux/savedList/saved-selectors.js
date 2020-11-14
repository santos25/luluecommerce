import { createSelector } from "reselect";

const selectSaved = (state) => state.savedList;

export const savedListSelector = createSelector(
  [selectSaved],
  (saveList) => saveList.savedListItems
);

// export const itemTotaValueSelector = createSelector([selectCart], (cart) =>
//   cart.cartitems.reduce(
//     (acumulator, currentItem) =>
//       acumulator + currentItem.quantity * currentItem.price.current.value,
//     0
//   )
// );

// export const cartitemsSelector = createSelector(
//   [selectCart],
//   (cart) => cart.cartitems
// );

// export const hiddeCartSelector = createSelector(
//   [selectCart],
//   (cart) => cart.hidden
// );
