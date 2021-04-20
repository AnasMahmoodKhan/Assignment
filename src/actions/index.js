import { SuccessIcon, DangerIcon } from "lucid-ui";
import API from "../utils/API";
import { actionTypes } from "./actionTypes";

export function getTodos() {
  return async (dispatch) => {
    await API.fetchTodos()
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

export function setSearchText(text) {
  return async (dispatch) => {
    await API.fetchTodos()
      .then((response) => {
        const todos = response.data
          .filter((todo) => {
            let pattern = new RegExp(text);
            return todo.title.match(pattern);
          })
          .filter(
            (todo) =>
              (todo.completed = todo.completed ? (
                <SuccessIcon />
              ) : (
                <DangerIcon />
              ))
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
