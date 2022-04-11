import { ADD_TO_CART, INCREMENT, DECREMENT } from "../actions/cart";

export function addCart(state = {}, action) {
  switch (action.type) {
    case ADD_TO_CART:
      if (!state.cart) {
        console.log("Added1");
        return { ...state, cart: [action.cart] };
      }
      let indx = state.cart.findIndex((cart) => cart.id === action.cart.id);
      console.log(indx, "index");
      if (indx !== -1) {
        console.log(indx, "inside");
        return {
          cart: state.cart.map((item, i) => {
            if (indx === i) {
              item.no_of_items++;
            }
            return item;
          }),
        };
      }
      console.log("Added");
      return { ...state, cart: [...state.cart, action.cart] };
    case INCREMENT:
      return {
        cart: state.cart.map((cart) => {
          if (cart.id === action.id) {
            cart.no_of_items++;
          }
          return cart;
        }),
      };

    case DECREMENT:
      let item = state.cart.find((cart) => cart.id === action.id);
      let ind = state.cart.findIndex((cart) => cart.id === action.id);
      if (item.no_of_items === 1) {
        state.cart.splice(ind, 1);
        return {
          cart: state.cart,
        };
      }
      return {
        cart: state.cart.map((cart) => {
          if (cart.id === action.id) {
            cart.no_of_items--;
          }
          return cart;
        }),
      };
    default:
      return state;
  }
}
