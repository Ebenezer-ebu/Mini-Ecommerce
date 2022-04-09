import { CARTEGORY } from "../actions/index";
import { SET_CATEGORY } from "../actions/category";

export function category(state = {}, action) {
  switch (action.type) {
    case CARTEGORY:
      return {
        ...state,
        categories: action.data.categories,
        defaultCategory: action.data.categories[0].name,
      };
    case SET_CATEGORY:
      return {
        ...state,
        defaultCategory: action.category,
      };
    default:
      return state;
  }
}
