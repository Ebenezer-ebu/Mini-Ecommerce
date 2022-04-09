import { combineReducers } from "redux";
import { category } from "./cartegory";
import { currency } from "./currency";
import { addCart } from "./cart";

export default combineReducers({
  category,
  currency,
  addCart,
});
