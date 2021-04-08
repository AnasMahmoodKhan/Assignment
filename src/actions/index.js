import axios from "axios";

export const actionTypes = {
  SET_TODOS: "SET_TODOS",
};

export function getTodos() {
  return async (dispatch) => {
    const response = await axios
      .get("https://jsonplaceholder.typicode.com/todos");
    dispatch({
      type: actionTypes.SET_TODOS,
      payload: response.data,
    });
  };
}