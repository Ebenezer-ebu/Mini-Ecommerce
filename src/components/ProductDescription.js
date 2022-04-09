import { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../utils/graphqlApi";
import { loadingData, errorData } from "../actions/index";
import { addToCart } from "../actions/cart";
import DisplayValue from "./DisplayValue";

const ProductDescription = (props) => {
  const { dispatch, state } = props;
  const [selectedAttr, setSelectedAttr] = useState({});
  const [allAttr, gotAllAttr] = useState(0);
  let params = useParams();
  let { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: params.id },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (data) {
    console.log(data, "***********");
  }
  const product = data.product;
  let images = product.gallery;
  if (images.length < 4) {
    images = Array(5).fill(images[0]);
  }
  let miniImages = images.slice(1, 5);
  const price = product.prices.find(
    (cost) => cost.currency.symbol === state.currency.defaultCurrency?.symbol
  );

  const handleSelectedAtt = (value, id, type, head) => {
    if (selectedAttr[head] && selectedAttr[head][id]) {
      const { [id]: value, ...rest } = selectedAttr[head];
      const stillPro = Object.keys(selectedAttr[head]).length > 0;
      if (stillPro) {
        setSelectedAttr((prev) => ({ ...prev, [head]: { ...rest } }));
      }
      // if (Object.keys(selectedAttr[head]).length === 0) {
      //   const { [head]: value, ...rest } = selectedAttr;
      //   setSelectedAttr((prev) => ({ ...prev, ...rest }));
      // }
    } else if (selectedAttr[head]) {
      setSelectedAttr((prev) => ({
        ...prev,
        [head]: { [id]: [value, type] },
      }));
    } else {
      let obj = { [head]: { [id]: [value, type] } };
      setSelectedAttr((prev) => ({ ...prev, ...obj }));
    }
  };

  const handleAddToCart = () => {
    const cart = {
      name: product.name,
      brand: product.brand,
      id: params.id,
      price,
      attributes: selectedAttr,
      image: images[images.length - 1],
    };
    let attrLen = [];
    const keys = Object.keys(selectedAttr);
    if (keys.length > 0) {
      keys.forEach((key) => {
        let obj = selectedAttr[key];
        attrLen.push(Object.values(obj));
      });
    }
    if (product.attributes.length === attrLen.length) {
      dispatch(addToCart(cart));
    } else {
      alert("Please make sure you selected from all attributes");
    }
  };
  console.log(selectedAttr, "In state", allAttr);
  return (
    <div className="container">
      <div className="description-content">
        <div className="img-grid">
          {miniImages.map((img, indx) => (
            <img src={img} alt={product.brand} key={indx} />
          ))}
        </div>
        <div className="main-img">
          <img src={images[images.length - 1]} alt={product.brand} />
        </div>
        <div className="description">
          <h1 className="head">{product.name}</h1>
          <p className="brand">{product.brand}</p>

          <div className="select-size">
            {product.attributes.length > 0
              ? product.attributes.map((attribute, idx) => (
                  <DisplayValue
                    key={idx}
                    attributes={attribute}
                    selectedAttr={selectedAttr}
                    handleSelectedAtt={handleSelectedAtt}
                    gotAllAttr={gotAllAttr}
                  />
                ))
              : null}
          </div>
          <p className="price-label">PRICE:</p>
          <p className="cost">{`${price?.currency.symbol}${price?.amount}`}</p>
          <button className="add-to-cart" onClick={handleAddToCart}>
            ADD TO CART
          </button>
          <p className="details">
            {product.description.replace(/<\/?[^>]+(>|$)/g, "")}
          </p>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(ProductDescription);
