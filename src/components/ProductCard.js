import React from "react";
import shirt from "../assets/shirt.png";
import { BsCart2 } from "react-icons/bs";

const ProductCard = () => {
  return (
    <div className="product-card">
      <div className="image">
        <img src={shirt} alt="shirt" className="product" />
        <BsCart2 className="cart-hover" />
      </div>
      <p className="name">Apollo Running Short</p>
      <p className="price">$50.00</p>
    </div>
  );
};

export default ProductCard;
