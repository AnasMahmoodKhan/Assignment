import { actionTypes } from "../actions/actionTypes";

const initialStore = {
  todos: [],
  page: 0,
  page_size: 0,
  todos_list: [],
  error: false,
  search_text: "",
};

function reducer(state = initialStore, action) {
  if (action.type === actionTypes.SET_PAGE) {
    return { ...state, page: action.payload };
  }

  if (action.type === actionTypes.SET_PAGE_SIZE) {
    return { ...state, page_size: action.payload };
  }

  if (action.type === actionTypes.SET_TODOS) {
    return { ...state, todos: action.payload ? action.payload : [] };
  }

  if (action.type === actionTypes.SET_TODOS_LIST) {
    return { ...state, todos_list: action.payload ? action.payload : [] };
  }

  if (action.type === actionTypes.SET_ERROR) {
    return { ...state, error: action.payload };
  }

  if (action.type === actionTypes.SET_SEARCH_TEXT) {
    return { ...state, search_text: action.payload };
  }
  return state;
}

export default reducer;
