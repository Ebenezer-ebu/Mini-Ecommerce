import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { decrementItems, incrementItems } from "../actions/cart";

class CartModal extends Component {
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
    const total = addCart.cart
      ? addCart.cart.reduce((accum, cart) => {
          let cost = cart.price.find(
            (price) =>
              price.currency.symbol === state.currency.defaultCurrency?.symbol
          );

          return accum + cost.amount * cart.no_of_items;
        }, 0)
      : 0;
    return (
      <div className="modal">
        <GrClose className="close-modal" onClick={handleCartModal} />
        <div className="modal-container">
          <div>
            <span className="my-bag">My Bag</span>
            {addCart.cart ? (
              <span>{` ,${addCart.cart.length} ${
                addCart.cart.length > 1 ? "items" : "item"
              }`}</span>
            ) : null}
          </div>
          {addCart.cart ? (
            <>
              {addCart.cart.map((cart, i) => (
                <div className="modal-content" key={i}>
                  <div className="product-details">
                    <div className="sub-details">
                      <p className="">{cart.name}</p>
                      <p className="">
                        {
                          cart.price.find(
                            (price) =>
                              price.currency.symbol ===
                              state.currency.defaultCurrency?.symbol
                          ).currency.symbol
                        }
                        {
                          cart.price.find(
                            (price) =>
                              price.currency.symbol ===
                              state.currency.defaultCurrency?.symbol
                          ).amount
                        }
                      </p>
                    </div>
                    <div className="check-size">
                      {Object.keys(cart.attributes).map((attr, i) => (
                        <div key={i}>
                          {Object.keys(cart.attributes[attr]).map(
                            (key, ind) => (
                              <div key={ind}>
                                <p style={{ margin: "3px 0", fontWeight: "bold"}}>{attr}</p>
                                <button
                                  className="size"
                                  style={{
                                    background:
                                      cart.attributes[attr][key][1] === "swatch"
                                        ? cart.attributes[attr][key][0]
                                        : "",
                                    border:
                                      cart.attributes[attr][key][1] === "swatch"
                                        ? "none"
                                        : "",
                                    width:
                                      cart.attributes[attr][key][1] === "swatch"
                                        ? "30px"
                                        : "",
                                    height:
                                      cart.attributes[attr][key][1] === "swatch"
                                        ? "30px"
                                        : "",
                                  }}
                                >
                                  {cart.attributes[attr][key][1] === "swatch"
                                    ? ""
                                    : cart.attributes[attr][key][0]}
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rate">
                    <button
                      className="gauge"
                      onClick={() => this.incrementNum(cart.id)}
                    >
                      ＋
                    </button>
                    <p className="count">{cart.no_of_items}</p>
                    <button
                      className="gauge"
                      onClick={() => this.decrementNum(cart.id)}
                    >
                      －
                    </button>
                  </div>
                  <div className="mini-image">
                    <img
                      src={cart.image}
                      alt={cart.image}
                      className="cart-image"
                    />
                  </div>
                </div>
              ))}
              <div className="total">
                <p>Total</p>
                <p>
                  {state.currency.defaultCurrency?.symbol}
                  {total}
                </p>
              </div>
              <div className="view-checkout">
                <Link to="/view-bag" className="view" onClick={handleCartModal}>
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
            </>
          ) : (
            <h4>No Items In Bag</h4>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, { outerRef }) {
  return { state, outerRef };
}

export default connect(mapStateToProps)(CartModal);
