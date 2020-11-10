import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const itemCountSelector = createSelector([selectCart], (cart) =>
  cart.cartitems.reduce(
    (acumulator, currentItem) => acumulator + currentItem.quantity,
    0
  )
);

export const itemTotaValueSelector = createSelector([selectCart], (cart) =>
  cart.cartitems.reduce(
    (acumulator, currentItem) =>
      acumulator + currentItem.quantity * currentItem.price.current.value,
    0
  )
);

export const cartitemsSelector = createSelector(
  [selectCart],
  (cart) => cart.cartitems
);

export const hiddeCartSelector = createSelector(
  [selectCart],
  (cart) => cart.hidden
);
