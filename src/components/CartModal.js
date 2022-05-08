import { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import Content from "./Content";
import { decrementItems, incrementItems } from "../actions/cart";

class CartModal extends PureComponent {
  incrementNum = (id) => {
    const { dispatch } = this.props;
    dispatch(incrementItems(id));
  };
  decrementNum = (id) => {
    const { dispatch } = this.props;
    dispatch(decrementItems(id));
  };
  render() {
    const { state, handleCartModal } = this.props;
    const { addCart } = state;
    let itemsInBag = 0;
    const total = addCart.cart
      ? addCart.cart.reduce((accum, cart) => {
          const cost = cart.price.find(
            (price) =>
              price.currency.symbol === state.currency.defaultCurrency?.symbol
          );
          itemsInBag += cart.no_of_items;
          return accum + cost.amount * cart.no_of_items;
        }, 0)
      : 0;
    return (
      <div className="modal">
        <OutsideClickHandler
          onOutsideClick={(e) => {
            console.log(e);
            handleCartModal();
          }}
        >
          <div className="modal-container">
            <div>
              <span className="my-bag">My Bag</span>
              {addCart.cart ? (
                <span>{` ,${itemsInBag} ${
                  itemsInBag > 1 ? "items" : "item"
                }`}</span>
              ) : null}
            </div>
            {addCart.cart ? (
              <div>
                {addCart.cart.map((cart, i) => (
                  <Content cart={cart} key={i} />
                ))}
                <div className="total">
                  <p>Total</p>
                  <p>
                    {state.currency.defaultCurrency?.symbol}
                    {total.toFixed(2)}
                  </p>
                </div>
                <div className="view-checkout">
                  <Link
                    to="/view-bag"
                    className="view"
                    onClick={handleCartModal}
                  >
                    <button>VIEW BAG</button>
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={handleCartModal}
                    className="checkout"
                  >
                    <button>CHECKOUT</button>
                  </Link>
                </div>
              </div>
            ) : (
              <h4>No Items In Bag</h4>
            )}
          </div>
        </OutsideClickHandler>
      </div>
    );
  }
}

function mapStateToProps(state, { outerRef }) {
  return { state, outerRef };
}

export default connect(mapStateToProps)(CartModal);
