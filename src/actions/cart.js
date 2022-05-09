export const ADD_TO_CART = "ADD_TO_CART";
export const DECREMENT = "DECREMENT";
export const INCREMENT = "INCREMENT";
export const SELECTED = "SELECTED";

export function addToCart(cart) {
  return {
    type: ADD_TO_CART,
    cart,
  };
}

export function decrementItems(id, index) {
  return {
    type: DECREMENT,
    id,
    index,
  };
}

export function incrementItems(id, index) {
  return {
    type: INCREMENT,
    id,
    index,
  };
}

export function updateSelection(index, attr, value) {
  return {
    type: SELECTED,
    index,
    attr,
    value,
  };
}
