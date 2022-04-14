import React, { Component } from "react";
import { connect } from "react-redux";
import { client } from "../index";
import { GET_CURRENCIES } from "../utils/graphqlApi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { setCurrency, selectedCurrency } from "../actions/currency";

class DropDown extends Component {
  state = {
    active: false,
  };
  handleSelected = (currency) => {
    this.props.dispatch(selectedCurrency(currency));
  };

  setActive = () => {
    this.setState((prev) => ({ ...prev, active: !this.state.active }));
  };

  componentDidMount() {
    client
      .query({
        query: GET_CURRENCIES,
      })
      .then((result) => {
        if (result.data) {
          this.props.dispatch(setCurrency(result.data));
        }
      });
  }
  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (prevProps.active !== this.state.active) {
      console.log(this.props.modal, "########");
      if (this.props.modal && this.state.active) {
        this.props.handleCartModal();
      }
    }
    if (prevProps.modal !== this.props.modal) {
      if (this.props.modal && this.state.active) {
        this.setActive();
      }
    }
  }
  render() {
    const { state } = this.props;
    const { currency } = state;

    const { active } = this.state;
    return (
      <div className="dropdown-container">
        <div className="selected">
          {currency.defaultCurrency?.symbol}
          <div className="icons" onClick={this.setActive}>
            {active ? (
              <RiArrowDropUpLine size={20} />
            ) : (
              <RiArrowDropDownLine size={20} />
            )}
          </div>
        </div>
        {active ? (
          <div className="list">
            {currency?.currency.map((curr, idx) => (
              <div
                key={idx}
                className="dropdown-menu"
                onClick={() => this.handleSelected(curr)}
              >
                {`${curr.symbol} ${curr.label}`}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(DropDown);
