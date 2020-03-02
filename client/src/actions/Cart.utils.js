export const addItemsToCart = (cart, cartItemToAdd) => {
  // At first we need to see if the cartItemToAdd is already in the array or not. .find returns a boolean value
  const cartExistingItem = cart.find(
    cartItem => cartItem._id === cartItemToAdd._id
  );
  // if the item exist, then we return a new array because react needs to see a new array in order to do changes
  // We do this by mapping through cart array and for every item inside the array, we check if its id matches the id of the item which needs to be added
  // if it does, then we return a new object and increase its quantity with 1
  // else we return the cart item
  if (cartExistingItem) {
    return cart.map(cartItem =>
      cartItem._id === cartItemToAdd._id
        ? { ...cartItem, count: cartItem.count + 1, ...(cartItem.quantity - 1) }
        : cartItem
    );
  }
  //   This code will run if the cart is empty
  return [...cart, { ...cartItemToAdd, count: 1 }];
};
