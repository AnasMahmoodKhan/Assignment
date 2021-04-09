import { actionTypes } from "../actions";

const initialStore = {
  todos: [],
  page: 0,
  page_size: 0,
  todos_list: [],
};

function reducer(state = initialStore, action) {
  if (action.type === actionTypes.SET_PAGE) {
    return { ...state, page: action.payload };
  }

  if (action.type === actionTypes.SET_PAGE_SIZE) {
    return { ...state, page_size: action.payload };
  }

  if (action.type === actionTypes.SET_TODOS) {
    return { ...state, todos: action.payload };
  }

  if (action.type === actionTypes.SET_TODOS_LIST) {
    return { ...state, todos_list: action.payload };
  }

  return state;
}

export default reducer;
