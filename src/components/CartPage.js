import { Component } from "react";
import sweater from "../assets/Product-D_(1).png";
import glasses from "../assets/Product-D.png";

class CartPage extends Component {
  render() {
    return (
      <div className="container">
        <div className="cart-head">
          <h1>CART</h1>
        </div>
        <div className="stock-content">
          <div>
            <h2>
              Apollo
              <br />
              Running Short
            </h2>
            <p>$50.00</p>
            <button className="measure">S</button>
            <button className="measure">M</button>
          </div>
          <div className="rate2">
            <div className="rating">
              <button className="gauge2">＋</button>
              <p>1</p>
              <button className="gauge2">－</button>
            </div>
            <div className="mini-image2">
              <img src={sweater} alt="sweater" />
            </div>
          </div>
        </div>
        <div className="stock-content">
          <div>
            <h2>
              Jupiter
              <br />
              Wayfarer
            </h2>
            <p>$75.00</p>
            <button className="measure">S</button>
            <button className="measure">M</button>
          </div>
          <div className="rate2">
            <div className="rating">
              <button className="gauge2">＋</button>
              <p>2</p>
              <button className="gauge2">－</button>
            </div>
            <div className="mini-image2">
              <img src={glasses} alt="glasses" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartPage;
