import { actionTypes } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_TODOS:
      return action.payload;
    default:
      return state;
  }
};