import { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
    const { state, handleCartModal, node } = this.props;
    console.log(node)
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
        {/* <GrClose className="close-modal" onClick={handleCartModal} /> */}
        <div
          className="modal-container"
          ref={(tag) => {
            node.tag = tag;
          }}
        >
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
                <div className="modal-content" key={i}>
                  <div className="product-details">
                    <div className="sub-details">
                      <p className="">{cart.name}</p>
                      <p className="">{cart.brand}</p>
                      <p>
                        <b>
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
                        </b>
                      </p>
                    </div>
                    <div className="check-size">
                      {Object.keys(cart.attributes).map((attr, i) => (
                        <div key={i}>
                          {Object.keys(cart.attributes[attr]).map(
                            (key, ind) => (
                              <div key={ind}>
                                <p
                                  style={{
                                    margin: "3px 0",
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                  }}
                                >
                                  {attr}
                                </p>
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
                  {total.toFixed(2)}
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
            </div>
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
