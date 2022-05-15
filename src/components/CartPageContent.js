import "./CartPageContent.css";
import { PureComponent } from "react";
import { connect } from "react-redux";
import Slider from "./Slider";

class CartPageContent extends PureComponent {
  render() {
    const { cart, state, incrementNum, decrementNum, index } = this.props;
    return (
      <div className="stock-content">
        <div>
          <h2 className="head">{cart.name}</h2>
          <p className="brand">{cart.brand}</p>
          <p className="price2">
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
            {cart.attributes &&
              Object.keys(cart.attributes).map((attr, i) => (
                <div key={i}>
                  <p className="attr-name">{attr.toUpperCase()}:</p>
                  {Object.keys(cart.attributes[attr]).map((key, ind) => (
                    <span
                      key={ind}
                      className={`color-attr ${
                        cart.attributes[attr][key] && attr === "Color"
                          ? "style-attr"
                          : ""
                      } ${attr === "Color" ? "color-attr-style" : ""}`}
                    >
                      <button
                        key={ind}
                        className={`measure ${
                          attr === "Color" ? "measure-color" : ""
                        } ${
                          attr !== "Color" && cart.attributes[attr][key]
                            ? "select-attr"
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
              ))}
          </div>
        </div>
        <div className="rate2">
          <div className="rating">
            <button
              className="gauge2"
              onClick={() => incrementNum(cart.id, index)}
            >
              ＋
            </button>
            <p>{cart.no_of_items}</p>
            <button
              className="gauge2"
              onClick={() => decrementNum(cart.id, index)}
            >
              －
            </button>
          </div>
          <Slider slides={cart.image} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, { cart }) {
  return { state, cart };
}

export default connect(mapStateToProps)(CartPageContent);
