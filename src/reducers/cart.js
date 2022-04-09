import { ADD_TO_CART } from "../actions/cart";

export function addCart(state = {}, action) {
  switch (action.type) {
    case ADD_TO_CART:
      console.log("&&&&&&&&&&&&&&&");
      if (!state.cart) {
        return { ...state, cart: [action.cart] };
      }
      return { ...state, cart: [...state.cart, action.cart] };
    default:
      return state;
  }
}
