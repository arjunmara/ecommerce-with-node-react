import { createSelector } from "reselect";

const selectCart = state => state.cart;

export const selectCartItems = createSelector([selectCart, cart => cart.cart]);

export const selectCartItemsCount = createSelector([
  selectCartItems,
  cart =>
    cart.reduce(
      (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.count,
      0
    )
]);
