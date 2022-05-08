import { Component } from "react";
import { connect } from "react-redux";

class Content extends Component {
  render() {
    const { cart, state } = this.props;
    return (
      <div className="modal-content">
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
                {Object.keys(cart.attributes[attr]).map((key, ind) => (
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
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="rate">
          <button className="gauge" onClick={() => this.incrementNum(cart.id)}>
            ＋
          </button>
          <p className="count">{cart.no_of_items}</p>
          <button className="gauge" onClick={() => this.decrementNum(cart.id)}>
            －
          </button>
        </div>
        <div className="mini-image">
          <img src={cart.image} alt={cart.image} className="cart-image" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, { cart }) {
  return {
    state,
    cart,
  };
}

export default connect(mapStateToProps)(Content);
