import { PureComponent } from "react";
import { connect } from "react-redux";

class CartPageContent extends PureComponent {
  render() {
    const { cart, state, incrementNum, decrementNum, index } = this.props;
    return (
      <div className="stock-content">
        <div>
          <h2 style={{ margin: 0 }}>{cart.name}</h2>
          <p style={{ fontSize: "22px", margin: 0 }}>{cart.brand}</p>
          <p style={{ fontWeight: "bold" }}>
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
                <p
                  style={{
                    margin: "3px 0",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {attr.toUpperCase()}:
                </p>
                {Object.keys(cart.attributes[attr]).map((key, ind) => (
                  <span
                    key={ind}
                    style={{
                      display: "inline-block",
                      border:
                        cart.attributes[attr][key] && attr === "Color"
                          ? "3px solid #5ece7b"
                          : "",
                      width: attr === "Color" ? "35px" : "",
                      height: "35px",
                      margin: "0 5px 15px 0",
                      padding: "1px",
                    }}
                  >
                    <button
                      key={ind}
                      className="measure"
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
                        width: attr === "Color" ? "35px" : "",
                        height: attr === "Color" ? "35px" : "",
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
          <div className="mini-image2">
            <img src={cart.image} alt={cart.image} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, { cart }) {
  return { state, cart };
}

export default connect(mapStateToProps)(CartPageContent);
