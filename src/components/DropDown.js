import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_CURRENCIES } from "../utils/graphqlApi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { setCurrency, selectedCurrency } from "../actions/currency";

const DropDown = (props) => {
  const { dispatch, state } = props;
  const { currency } = state;
  const [stated, setState] = useState({
    active: false,
  });

  const { loading, error, data } = useQuery(GET_CURRENCIES);

  const handleSelected = (currency) => {
    dispatch(selectedCurrency(currency));
  };
  const setActive = () => {
    setState((prev) => ({ ...prev, active: !stated.active }));
  };

  useEffect(() => {
    if (data) dispatch(setCurrency(data));
  }, [data]);

  const { active } = stated;
  return (
    <div className="dropdown-container">
      <div className="selected">
        {currency.defaultCurrency?.symbol}
        <div className="icons" onClick={setActive}>
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
              onClick={() => handleSelected(curr)}
            >
              {`${curr.symbol} ${curr.label}`}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(DropDown);
