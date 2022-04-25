import { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_PRODUCT_BY_ID } from "../utils/graphqlApi";
import { addToCart } from "../actions/cart";
import DisplayValue from "./DisplayValue";
import { client } from "../index";

class ProductDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAttr: {},
      allAttr: 0,
      data: [],
    };
  }

  componentDidMount() {
    client
      .query({
        query: GET_PRODUCT_BY_ID,
        variables: { id: this.props.params.id },
      })
      .then((result) => {
        if (result.loading) return <p>Loading...</p>;
        if (result.error) return <p>Error Loading Product...</p>;
        if (result.data)
          this.setState((prev) => ({ ...prev, data: result.data }));
      });
  }

  handleSelectedAtt = (value, id, type, head) => {
    const { selectedAttr } = this.state;
    if (selectedAttr[head]) {
      this.setState((prev) => ({
        ...prev,
        selectedAttr: { ...prev.selectedAttr, [head]: { [id]: [value, type] } },
      }));
    } else {
      let obj = { [head]: { [id]: [value, type] } };
      this.setState((prev) => ({
        ...prev,
        selectedAttr: { ...prev.selectedAttr, ...obj },
      }));
    }
  };

  handleAddToCart = () => {
    const { data, selectedAttr } = this.state;
    const { dispatch } = this.props;
    const { product } = data;
    let images = data.product.gallery;
    if (images.length < 4) {
      images = Array(5).fill(images[0]);
    }
    const cart = {
      name: product.name,
      brand: product.brand,
      id: this.props.params.id,
      price: product.prices,
      attributes: selectedAttr,
      image: images[images.length - 1],
      no_of_items: 1,
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
  render() {
    const { state } = this.props;
    const { data, selectedAttr } = this.state;
    const { product } = data;
    let images = product?.gallery;
    if (images?.length < 4) {
      images = Array(5).fill(images[0]);
    }
    let miniImages = images?.slice(1, 5);
    const price = product?.prices.find(
      (cost) => cost.currency.symbol === state.currency.defaultCurrency?.symbol
    );
    const html = { __html: product?.description };
    return (
      <div className="container">
        <div className="description-content">
          <div className="img-grid">
            {miniImages?.map((img, indx) => (
              <img src={img} alt={product.brand} key={indx} />
            ))}
          </div>
          <div className="main-img">
            <img
              src={images && images[images.length - 1]}
              alt={product?.brand}
            />
          </div>
          <div className="description">
            <h1 className="head">{product?.name}</h1>
            <p className="brand">{product?.brand}</p>

            <div className="select-size">
              {product?.attributes.length > 0
                ? product.attributes.map((attribute, idx) => (
                    <DisplayValue
                      key={idx}
                      attributes={attribute}
                      selectedAttr={selectedAttr}
                      handleSelectedAtt={this.handleSelectedAtt}
                      gotAllAttr={this.gotAllAttr}
                    />
                  ))
                : null}
            </div>
            <p className="price-label">PRICE:</p>
            <p className="cost">{`${price?.currency.symbol}${price?.amount}`}</p>
            <button className="add-to-cart" onClick={this.handleAddToCart}>
              ADD TO CART
            </button>
            <p className="details" dangerouslySetInnerHTML={html} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export default connect(mapStateToProps)(withParams(ProductDescription));
