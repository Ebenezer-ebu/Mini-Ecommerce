import { useCallback, useEffect, useRef } from "react";
import sweater from "../assets/Product-D_(1).png";
import glasses from "../assets/Product-D.png";

const CartModal = (props) => {
  const outerRef = useRef(null);

  const useOnOutsideClick = (ref, callback) => {
    console.log(ref, callback);
    const handleMouseDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    useEffect(() => {
      document.addEventListener("click", handleMouseDown);

      return () => document.removeEventListener("click", handleMouseDown);
    });
  };
  useOnOutsideClick(outerRef, props.handleClick);
  return (
    <div className="modal">
      <div className="modal-container" ref={outerRef}>
        <h3>My Bag</h3>
        <div className="modal-content">
          <div className="product-details">
            <div className="sub-details">
              <p className="">Apollo Running Short</p>
              <p className="">$50.00</p>
            </div>
            <div className="check-size">
              <button className="size">S</button>
              <button className="size">M</button>
            </div>
          </div>
          <div className="rate">
            <button className="gauge">＋</button>
            <p className="count">1</p>
            <button className="gauge">－</button>
          </div>
          <div className="mini-image">
            <img src={sweater} alt="sweater" className="cart-image" />
          </div>
        </div>
        <div className="modal-content">
          <div className="product-details">
            <div className="sub-details">
              <p className="">Apollo Running Short</p>
              <p className="">$50.00</p>
            </div>
            <div className="check-size">
              <button className="size">S</button>
              <button className="size">M</button>
            </div>
          </div>
          <div className="rate">
            <button className="gauge">＋</button>
            <p className="count">2</p>
            <button className="gauge">－</button>
          </div>
          <div className="mini-image">
            <img src={glasses} alt="sweater" className="cart-image" />
          </div>
        </div>
        <div className="total">
          <p>Total</p>
          <p>$100.00</p>
        </div>
        <div className="view-checkout">
          <button className="view">VIEW BAG</button>
          <button className="checkout">CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
