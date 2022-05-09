import { Component } from "react";
import { connect } from "react-redux";
import { updateSelection } from "../actions/cart";

class Content extends Component {
  updateSelected = (id, attr, value) => {
    const { dispatch } = this.props;
    dispatch(updateSelection(id, attr, value));
  };
  render() {
    const { cart, state, incrementNum, decrementNum, index } = this.props;
    return (
      <div className="modal-content">
        <div className="product-details">
          <div>
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
                <p
                  style={{
                    margin: "3px 0",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {attr}
                </p>
                {Object.keys(cart.attributes[attr]).map((key, ind) => (
                  <span
                    key={ind}
                    style={{
                      display: "inline-block",
                      padding: "1px",
                      border:
                        cart.attributes[attr][key] && attr === "Color"
                          ? "2px solid #5ece7b"
                          : "",
                      width:
                        cart.attributes[attr][key] && attr === "Color"
                          ? "30px"
                          : "",
                      height: "30px",
                    }}
                  >
                    <button
                      className="size"
                      style={{
                        background:
                          attr === "Color"
                            ? key
                            : attr !== "Color" && cart.attributes[attr][key]
                            ? "black"
                            : "",
                        color:
                          attr !== "Color" && cart.attributes[attr][key]
                            ? "#fff"
                            : "",
                        border: attr === "Color" ? "0.5px solid #8D8F9A" : "",
                        width: attr === "Color" ? "30px" : "",
                        height: attr === "Color" ? "30px" : "",
                      }}
                      onClick={() => this.updateSelected(index, attr, key)}
                    >
                      {attr === "Color" ? "" : key}
                    </button>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="rate">
          <button
            className="gauge"
            onClick={() => incrementNum(cart.id, index)}
          >
            ＋
          </button>
          <p className="count">{cart.no_of_items}</p>
          <button
            className="gauge"
            onClick={() => decrementNum(cart.id, index)}
          >
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

function mapStateToProps(state, { cart, incrementNum, decrementNum }) {
  return {
    state,
    cart,
    incrementNum,
    decrementNum,
  };
}

export default connect(mapStateToProps)(Content);
