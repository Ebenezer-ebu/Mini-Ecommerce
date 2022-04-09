import { CURRENCY, SET_CURRENCY } from "../actions/currency";

export function currency(state = {}, action) {
  switch (action.type) {
    case CURRENCY:
      return {
        ...state,
        currency: action.currency.currencies,
        defaultCurrency: action.currency.currencies[0],
      };
    case SET_CURRENCY:
      return {
        ...state,
        defaultCurrency: action.currency,
      };
    default:
      return state;
  }
}
