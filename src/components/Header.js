import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../utils/graphqlApi";
import { loadingData, getProducts, errorData } from "../actions/index";
import { setCategory } from "../actions/category";
import { BsCart2 } from "react-icons/bs";
import bag from "../assets/bag.png";
import curve from "../assets/bag-arror.png";
import arrow from "../assets/arrow.png";
import DropDown from "./DropDown";
import CartModal from "./CartModal";

const Header = (props) => {
  const { dispatch, state } = props;
  const { category, addCart } = state;
  const [active, setActive] = useState({
    status: "active",
  });
  const [modal, showModal] = useState(false);
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  const handleSelectedCategory = (category) => {
    dispatch(setCategory(category));
  };

  const handleCartModal = () => {
    showModal((prev) => !prev);
  };
  const outerRef = useRef();

  useEffect(() => {
    if (loading) dispatch(loadingData(loading));
    if (error) dispatch(errorData(error));
    if (data) dispatch(getProducts(data));
  }, [loading, error, data]);
  return (
    <nav className="header">
      <div className="category">
        {category.categories?.map((cate) => (
          <div
            key={cate.name}
            className={`item ${
              cate.name === category.defaultCategory ? active.status : ""
            }`}
            onClick={() => handleSelectedCategory(cate.name)}
          >
            {cate.name.split("")[0].toUpperCase() + cate.name.slice(1)}
          </div>
        ))}
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
        <BsCart2 size={20} onClick={handleCartModal} />
        <div className="num-of-items">
          {addCart.cart ? addCart.cart.length : null}
        </div>
      </div>
      {modal && <CartModal outerRef={outerRef} />}
    </nav>
  );
};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(Header);
