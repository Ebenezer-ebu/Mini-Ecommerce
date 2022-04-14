import { Component } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { client } from "../index";
import { GET_PRODUCTS } from "../utils/graphqlApi";
import { loadingData, getProducts, errorData } from "../actions/index";
import { setCategory } from "../actions/category";
import { BsCart2 } from "react-icons/bs";
import bag from "../assets/bag.png";
import curve from "../assets/bag-arror.png";
import arrow from "../assets/arrow.png";
import DropDown from "./DropDown";
import CartModal from "./CartModal";

class Header extends Component {
  state = {
    modal: false,
  };
  handleSelectedCategory = (category) => {
    this.props.dispatch(setCategory(category));
    this.props.navigate("/");
  };

  handleCartModal = () => {
    this.setState((prev) => ({ ...prev, modal: !this.state.modal }));
  };

  componentDidMount() {
    client
      .query({
        query: GET_PRODUCTS,
      })
      .then((result) => {
        if (result.loading) this.props.dispatch(loadingData(result.loading));
        if (result.error) this.props.dispatch(errorData(result.error));
        if (result.data) this.props.dispatch(getProducts(result.data));
      });
  }
  render() {
    const { state } = this.props;
    const { category, addCart } = state;
    const { modal } = this.state;

    return (
      <nav className="header">
        <div className="category">
          {category.categories?.map((cate) => (
            <div
              key={cate.name}
              className={`item ${
                cate.name === category.defaultCategory ? "active" : ""
              }`}
              onClick={() => this.handleSelectedCategory(cate.name)}
            >
              {cate.name.split("")[0].toUpperCase() + cate.name.slice(1)}
            </div>
          ))}
        </div>
        <div className="bag-img">
          <Link to="/view-bag">
            <div className="bags">
              <img src={bag} alt="bag" className="bag" />
              <img src={curve} alt="arror-bag" className="arror-bag" />
              <img src={arrow} alt="arrow" className="arrow" />
            </div>
          </Link>
        </div>
        <div className="cart-section">
          <DropDown handleCartModal={this.handleCartModal} modal={modal} />
          <BsCart2
            size={20}
            onClick={this.handleCartModal}
            style={{ cursor: "pointer" }}
          />
          <div className="num-of-items">
            {addCart.cart && addCart.cart.length !== 0
              ? addCart.cart.length
              : null}
          </div>
        </div>
        {modal && <CartModal handleCartModal={this.handleCartModal} />}
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

function withRouter(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

export default connect(mapStateToProps)(withRouter(Header));
