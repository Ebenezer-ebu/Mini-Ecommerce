import { PureComponent } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { BsCart2 } from "react-icons/bs";

class ProductCard extends PureComponent {
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
        onClick={() => this.handleSingleProduct(data?.id)}
      >
        <div className="image">
          <img src={data?.gallery[0]} alt={data?.name} className="product" />
          <h3>{data?.inStock ? "" : "OUT OF STOCK"}</h3>
          <BsCart2 className="cart-hover" />
        </div>
        <p className="name">{data?.name}</p>
        <p className="price">{`${currencyInUse.currency.symbol}${currencyInUse.amount}`}</p>
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
