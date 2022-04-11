import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { decrementItems, incrementItems } from "../actions/cart";

const CartModal = (props) => {
  const { outerRef, state, dispatch } = props;
  const { addCart } = state;
  const total = addCart.cart.reduce((accum, cart) => {
    let cost = cart.price.find(
      (price) =>
        price.currency.symbol === state.currency.defaultCurrency?.symbol
    );

    return accum + cost.amount * cart.no_of_items;
  }, 0);
  console.log(total);
  const incrementNum = (id) => {
    dispatch(incrementItems(id));
  };

  const decrementNum = (id) => {
    dispatch(decrementItems(id));
  };
  return (
    <div className="modal">
      <div className="modal-container" ref={outerRef}>
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
            {addCart.cart.map((cart) => (
              <div className="modal-content" key={cart.id}>
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
                        {Object.keys(cart.attributes[attr]).map((key, ind) => (
                          <div key={ind}>
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
                <div className="rate">
                  <button
                    className="gauge"
                    onClick={() => incrementNum(cart.id)}
                  >
                    ＋
                  </button>
                  <p className="count">{cart.no_of_items}</p>
                  <button
                    className="gauge"
                    onClick={() => decrementNum(cart.id)}
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
              <Link to="/view-bag" className="view">
                <button>VIEW BAG</button>
              </Link>
              <button className="checkout">CHECKOUT</button>
            </div>
          </>
        ) : (
          <h4>No Items In Bag</h4>
        )}
      </div>
    </div>
  );
};

function mapStateToProps(state, { outerRef }) {
  return { state, outerRef };
}

export default connect(mapStateToProps)(CartModal);
