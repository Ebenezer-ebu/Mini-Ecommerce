import { Component } from "react";
import { connect } from "react-redux";
import { decrementItems, incrementItems } from "../actions/cart";

class CartPage extends Component {
  incrementNum = (id) => {
    const { dispatch } = this.props;
    dispatch(incrementItems(id));
  };

  decrementNum = (id) => {
    const { dispatch } = this.props;
    dispatch(decrementItems(id));
  };
  render() {
    const { state } = this.props;
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
      <div className="container">
        <div className="cart-head">
          <div className="top">
            <h1>CART</h1>
            <h3>
              {state.currency.defaultCurrency?.symbol}
              {total}
            </h3>
          </div>

          <div>
            {addCart.cart && addCart.cart.length > 0 ? (
              addCart.cart.map((cart) => (
                <div className="stock-content">
                  <div>
                    <h2>
                      {cart.name}
                      <br />
                      {cart.brand}
                    </h2>
                    <p>
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
                    <div className="attr">
                      {Object.keys(cart.attributes).map((attr, i) => (
                        <div key={i}>
                          {Object.keys(cart.attributes[attr]).map(
                            (key, ind) => (
                              <button
                                key={ind}
                                className="measure"
                                style={{
                                  background:
                                    cart.attributes[attr][key][1] === "swatch"
                                      ? cart.attributes[attr][key][0]
                                      : "",
                                  border:
                                    cart.attributes[attr][key][1] === "swatch"
                                      ? "none"
                                      : "",
                                }}
                              >
                                {cart.attributes[attr][key][1] === "swatch"
                                  ? key
                                  : cart.attributes[attr][key][0]}
                              </button>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rate2">
                    <div className="rating">
                      <button
                        className="gauge2"
                        onClick={() => this.incrementNum(cart.id)}
                      >
                        ＋
                      </button>
                      <p>{cart.no_of_items}</p>
                      <button
                        className="gauge2"
                        onClick={() => this.decrementNum(cart.id)}
                      >
                        －
                      </button>
                    </div>
                    <div className="mini-image2">
                      <img src={cart.image} alt={cart.image} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No Items In Cart</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(CartPage);
