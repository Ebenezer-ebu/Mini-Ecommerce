import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { BsCart2 } from "react-icons/bs";

const ProductCard = (props) => {
  const { data, state, dispatch } = props;
  const { currency } = state;
  const { defaultCurrency } = currency;
  let navigate = useNavigate();

  const currencyInUse = data.prices.find(
    (price) => price.currency.symbol === defaultCurrency.symbol
  );
  const handleSingleProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card" onClick={() => handleSingleProduct(data?.id)}>
      <div className="image">
        <img src={data?.gallery[0]} alt={data?.name} className="product" />
        <BsCart2 className="cart-hover" />
      </div>
      <p className="name">{data?.name}</p>
      <p className="price">{`${currencyInUse.currency.symbol}${currencyInUse.amount}`}</p>
    </div>
  );
};

function mapStateToProps(state, { data }) {
  return {
    state,
    data,
  };
}

export default connect(mapStateToProps)(ProductCard);
