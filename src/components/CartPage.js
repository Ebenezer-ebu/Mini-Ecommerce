import { PureComponent } from "react";
import { connect } from "react-redux";
import { decrementItems, incrementItems } from "../actions/cart";
import CartPageContent from "./CartPageContent";

class CartPage extends PureComponent {
  incrementNum = (id, index) => {
    const { dispatch } = this.props;
    dispatch(incrementItems(id, index));
  };

  decrementNum = (id, index) => {
    const { dispatch } = this.props;
    dispatch(decrementItems(id, index));
  };
  render() {
    const { state } = this.props;
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
      <div className="container">
        <div className="cart-head">
          <div className="top">
            <h1>CART</h1>
          </div>
          <div>
            {addCart.cart && addCart.cart.length > 0 ? (
              <>
                {addCart.cart.map((cart, indx) => (
                  <CartPageContent
                    cart={cart}
                    index={indx}
                    key={cart.id}
                    incrementNum={this.incrementNum}
                    decrementNum={this.decrementNum}
                  />
                ))}
                <div className="order-item">
                  <div>
                    <p>
                      Tax:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {state.currency.defaultCurrency?.symbol}15.00
                      </span>
                    </p>
                    <p>
                      Qty:{" "}
                      <span style={{ fontWeight: "bold" }}>{itemsInBag}</span>
                    </p>
                  </div>
                  <p>
                    Total:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {" "}
                      {state.currency.defaultCurrency?.symbol}
                      {total.toFixed(2)}
                    </span>
                  </p>
                  <button className="order">ORDER</button>
                </div>
              </>
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
