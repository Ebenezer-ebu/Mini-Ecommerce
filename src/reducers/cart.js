import { ADD_TO_CART, INCREMENT, DECREMENT, SELECTED } from "../actions/cart";

export function addCart(state = {}, action) {
  switch (action.type) {
    case ADD_TO_CART:
      if (!state.cart) {
        return { ...state, cart: [action.cart] };
      }
      let indx = state.cart.findIndex(
        (cart) =>
          (cart.id === action.cart.id &&
            JSON.stringify(cart.attributes) ===
              JSON.stringify(action.cart.attributes)) ||
          (cart.id === action.cart.id && !cart.attributes)
      );
      if (indx !== -1) {
        console.log("Yesssss");
        return {
          cart: state.cart.map((item, i) => {
            if (indx === i) {
              item.no_of_items++;
            }
            return item;
          }),
        };
      }
      return { ...state, cart: [...state.cart, action.cart] };
    case INCREMENT:
      return {
        cart: state.cart.map((cart, i) => {
          if (cart.id === action.id && i === action.index) {
            cart.no_of_items++;
          }
          return cart;
        }),
      };

    case DECREMENT:
      let item = state.cart.find(
        (cart, i) => cart.id === action.id && i === action.index
      );
      let ind = state.cart.findIndex(
        (cart, i) => cart.id === action.id && i === action.index
      );
      if (item.no_of_items === 1) {
        state.cart.splice(ind, 1);
        return {
          cart: state.cart,
        };
      }
      return {
        cart: state.cart.map((cart, i) => {
          if (cart.id === action.id && i === action.index) {
            cart.no_of_items--;
          }
          return cart;
        }),
      };
    case SELECTED:
      return {
        ...state,
        cart: state.cart.map((cart, i) => {
          if (i === action.index) {
            let keys = Object.keys(cart.attributes[action.attr]);
            keys.forEach((key) => {
              if (key === action.value) {
                cart.attributes[action.attr][key] = true;
              } else {
                cart.attributes[action.attr][key] = false;
              }
            });
          }
          return cart;
        }),
      };
    default:
      return state;
  }
}
