export const ADD_TO_CART = "ADD_TO_CART";

export function addToCart(cart) {
    return {
        type: ADD_TO_CART,
        cart
    }
}