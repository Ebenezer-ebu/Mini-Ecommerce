import { PureComponent } from "react";
import { connect } from "react-redux";

class CartPageContent extends PureComponent {
  render() {
    const { cart, state } = this.props;
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
                {Object.keys(cart.attributes[attr]).map((key, ind) => (
                  <div key={ind} style={{ marginRight: "10px" }}>
                    <p
                      style={{
                        margin: "3px 0",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {attr.toUpperCase()}:
                    </p>

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
                  </div>
                ))}
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
    );
  }
}

function mapStateToProps(state, { cart }) {
  return { state, cart };
}

export default connect(mapStateToProps)(CartPageContent);
