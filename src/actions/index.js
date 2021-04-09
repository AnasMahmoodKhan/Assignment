import axios from "axios";
import { SuccessIcon, DangerIcon } from "lucid-ui";

export const actionTypes = {
  SET_TODOS: "SET_TODOS",
  SET_PAGE: "SET_PAGE",
  SET_PAGE_SIZE: "SET_PAGE_SIZE",
  SET_TODOS_LIST: "SET_TODOS_LIST",
  SET_ERROR: "SET_ERROR",
};

export function getTodos() {
  return async (dispatch) => {
    await axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        const todos = response.data.filter(
          (todo) =>
            (todo.completed = todo.completed ? <SuccessIcon /> : <DangerIcon />)
        );
        dispatch({
          type: actionTypes.SET_TODOS,
          payload: todos,
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.SET_TODOS,
          payload: [],
        });
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: true,
        });
      });
  };
}

export function setTodosList(todos, page, page_size) {
  return (dispatch) => {
    let list = todos;
    const pageSizes = [10, 25, 50];
    list = list.slice(
      page * pageSizes[page_size],
      (page + 1) * pageSizes[page_size]
    );
    dispatch({
      type: actionTypes.SET_TODOS_LIST,
      payload: list,
    });
  };
}
