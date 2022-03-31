import React, { Component, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const currency = ["$ USD", "€ EUR", "￥ JPY"];

class DropDown extends Component {
  state = {
    active: false,
    selected: currency[0],
    currency: currency,
  };

  handleSelected = (currency) => {
    this.setState((prev) => ({
      ...prev,
      currency: currency,
    }));
  };
  setActive = () => {
    this.setState((prev) => ({ ...prev, active: !this.state.active }));
  };
  render() {
    const { active, selected, currency } = this.state;
    return (
      <div className="dropdown-container">
        <div className="selected">
          {selected.split(" ")[0]}
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
            {currency.map((curr, idx) => (
              <div
                key={idx}
                className="dropdown-menu"
                onClick={() => this.handleSelected(curr)}
              >
                {curr}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default DropDown;
