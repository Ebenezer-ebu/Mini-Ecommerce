import { Component } from "react";
import { connect } from "react-redux";
import "./Content.css";

class Content extends Component {
  render() {
    const { cart, state, incrementNum, decrementNum, index } = this.props;
    return (
      <div className="modal-content">
        <div className="product-details">
          <div>
            <p>{cart.name}</p>
            <p>{cart.brand}</p>
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
            {cart.attributes &&
              Object.keys(cart.attributes).map((attr, i) => (
                <div key={i}>
                  <p className="attr-para">{attr}:</p>
                  <div className="span-flex">
                    {Object.keys(cart.attributes[attr]).map((key, ind) => (
                      <span
                        key={ind}
                        className={`color-attr2 ${
                          cart.attributes[attr][key] && attr === "Color"
                            ? "style-attr2"
                            : ""
                        }`}
                      >
                        <button
                          className={`size ${
                            attr === "Color" ? "color-button" : ""
                          } ${
                            attr !== "Color" && cart.attributes[attr][key]
                              ? "big-btn"
                              : ""
                          }`}
                          style={{
                            background:
                              attr === "Color"
                                ? key
                                : attr !== "Color" && cart.attributes[attr][key]
                                ? "black"
                                : "",
                          }}
                        >
                          {attr === "Color" ? "" : key}
                        </button>
                      </span>
                    ))}
                  </div>
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
          <p>{cart.no_of_items}</p>
          <button
            className="gauge"
            onClick={() => decrementNum(cart.id, index)}
          >
            －
          </button>
        </div>
        <div className="mini-image">
          <img src={cart.image[0]} alt={cart.image[0]} />
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
