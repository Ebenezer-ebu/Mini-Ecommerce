export const ADD_TO_CART = "ADD_TO_CART";
export const DECREMENT = "DECREMENT";
export const INCREMENT = "INCREMENT";

export function addToCart(cart) {
  return {
    type: ADD_TO_CART,
    cart,
  };
}

export function decrementItems(id) {
  return {
    type: DECREMENT,
    id,
  };
}

export function incrementItems(id) {
  return {
    type: INCREMENT,
    id,
  };
}
