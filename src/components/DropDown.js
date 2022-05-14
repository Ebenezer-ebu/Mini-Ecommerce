import React, { PureComponent } from "react";
import { connect } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import { client } from "../index";
import { GET_CURRENCIES } from "../utils/graphqlApi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { setCurrency, selectedCurrency } from "../actions/currency";

class DropDown extends PureComponent {
  state = {
    active: false,
  };
  handleSelected = (currency) => {
    this.props.dispatch(selectedCurrency(currency));
    this.setState((prev) => ({ active: !prev.active }));
  };

  setActive = () => {
    this.setState((prev) => ({ active: !prev.active }));
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
  render() {
    const { state } = this.props;
    const { currency } = state;
    const { active } = this.state;
    return (
      <div className="dropdown-container">
        <OutsideClickHandler
          onOutsideClick={(e) => {
            this.setState({ active: false });
          }}
        >
          <div className="selected icons" onClick={this.setActive}>
            {currency.defaultCurrency?.symbol}
            <div className="icons">
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
        </OutsideClickHandler>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(DropDown);
