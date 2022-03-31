import React, { useState, useEffect, useRef } from "react";
import { BsCart2 } from "react-icons/bs";
import bag from "../assets/bag.png";
import curve from "../assets/bag-arror.png";
import arrow from "../assets/arrow.png";
import DropDown from "./DropDown";
import CartModal from "./CartModal";

const Header = () => {
  const [active, setActive] = useState("active");
  const [modal, showModal] = useState(false);

  const handleSelectedActive = () => {
    setActive(active);
  };

  const handleCartModal = () => {
    showModal((prev) => !prev);
  };

  return (
    <nav className="header">
      <div className="category">
        <div className={`item ${active}`}>Women</div>
        <div className="item">Men</div>
        <div className="item">Kids</div>
      </div>
      <div className="bag-img">
        <div className="bags">
          <img src={bag} alt="bag" className="bag" />
          <img src={curve} alt="arror-bag" className="arror-bag" />
          <img src={arrow} alt="arrow" className="arrow" />
        </div>
      </div>
      <div className="cart-section">
        <DropDown />
        <BsCart2 size={20} onClick={() => showModal((prev) => !prev)} />
      </div>
      {modal ? <CartModal handleClick={handleCartModal} /> : null}
    </nav>
  );
};

export default Header;
