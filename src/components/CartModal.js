import { connect } from "react-redux";
import sweater from "../assets/Product-D_(1).png";
import glasses from "../assets/Product-D.png";

const CartModal = (props) => {
  const { outerRef, state } = props;
  const { addCart } = state;
  return (
    <div className="modal">
      <div className="modal-container" ref={outerRef}>
        <h3>My Bag</h3>
        {addCart.cart ? (
          <>
            <span>{addCart.cart.length} items</span>
            {addCart.cart.map((cart) => (
              <div className="modal-content">
                <div className="product-details">
                  <div className="sub-details">
                    <p className="">{cart.name}</p>
                    <p className="">
                      {cart.price.currency.symbol}
                      {cart.price.amount}
                    </p>
                  </div>
                  {Object.keys(cart.attributes).map((attr) => (
                    <div className="check-size">
                      {Object.keys(cart.attributes[attr]).map((key) => (
                        <>
                          <button className="size">
                            {cart.attributes[attr][key][0]}
                          </button>
                          <button className="size">
                            {cart.attributes[attr][key][1]}
                          </button>
                        </>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="rate">
                  <button className="gauge">＋</button>
                  <p className="count">1</p>
                  <button className="gauge">－</button>
                </div>
                <div className="mini-image">
                  <img src={cart.image} alt="sweater" className="cart-image" />
                </div>
              </div>
            ))}
            <div className="total">
              <p>Total</p>
              <p>$100.00</p>
            </div>
            <div className="view-checkout">
              <button className="view">VIEW BAG</button>
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
