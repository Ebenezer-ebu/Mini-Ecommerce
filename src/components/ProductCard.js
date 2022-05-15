import { PureComponent } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { BsCart2 } from "react-icons/bs";
import { client } from "../index";
import { GET_PRODUCT_BY_ID } from "../utils/graphqlApi";
import { addToCart } from "../actions/cart";
import "./ProductCard.css";

class ProductCard extends PureComponent {
  handleAddToCart = (e, data) => {
    e.stopPropagation();
    const { dispatch } = this.props;
    client
      .query({
        query: GET_PRODUCT_BY_ID,
        variables: { id: data.id },
      })
      .then((result) => {
        if (result.loading) return <p>Loading...</p>;
        if (result.error) return <p>Error Loading Product...</p>;
        if (result.data) console.log(result.data);
        const { product } = result.data;
        if (product.attributes.length > 0 && product.inStock) {
          alert(
            "Product has some attributes you need to select 🤩, select image so as to make preferred selection"
          );
          return;
        } else if (product.inStock) {
          const cart = {
            name: product.name,
            brand: product.brand,
            id: product.id,
            price: product.prices,
            image: product.gallery,
            no_of_items: 1,
            attributes: {},
          };
          dispatch(addToCart(cart));
        } else {
          alert("This product is out of stock 😕");
        }
      });
  };

  handleSingleProduct = (id) => {
    this.props.navigate(`/product/${id}`);
  };
  render() {
    const { data, state } = this.props;
    const { currency } = state;
    const { defaultCurrency } = currency;

    const currencyInUse = data.prices.find(
      (price) => price.currency.symbol === defaultCurrency.symbol
    );

    return (
      <div
        className="product-card"
        style={{ opacity: data?.inStock ? "" : 0.5 }}
        onClick={() => this.handleSingleProduct(data?.id)}
      >
        <div className="image">
          <img src={data?.gallery[0]} alt={data?.name} className="product" />
          <h3>{data?.inStock ? "" : "OUT OF STOCK"}</h3>
          <BsCart2
            className="cart-hover"
            onClick={(e) => this.handleAddToCart(e, data)}
          />
        </div>
        <p className="name">{`${data?.name} ${data?.brand}`}</p>
        <p className="price">{`${
          currencyInUse.currency.symbol
        }${currencyInUse.amount.toFixed(2)}`}</p>
      </div>
    );
  }
}

function mapStateToProps(state, { data }) {
  return {
    state,
    data,
  };
}

function withNavigation(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

export default connect(mapStateToProps)(withNavigation(ProductCard));
