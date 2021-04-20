import React from "react";
import { connect } from "react-redux";
import { getTodos, setSearchText, setTodosList } from "../actions";
import { actionTypes } from "../actions/actionTypes";
import App from "./App";

const Root = ({
  fetchTodos,
  setPage,
  setPageSize,
  setTodosList,
  page,
  todos,
  page_size,
  todos_list,
  error,
  search_text,
  setSearch,
  fetchSearchedTodos,
}) => {
  return (
    <App
      fetchTodos={fetchTodos}
      setPage={setPage}
      setPageSize={setPageSize}
      setTodosList={setTodosList}
      page={page}
      todos={todos}
      page_size={page_size}
      todos_list={todos_list}
      error={error}
      search_text={search_text}
      setSearch={setSearch}
      fetchSearchedTodos={fetchSearchedTodos}
    />
  );
};

const mapStateToProps = (store) => {
  const {
    todos,
    page,
    page_size,
    todos_list,
    error,
    search_text,
  } = store.reducer;
  return { todos, page, page_size, todos_list, error, search_text };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTodos: () => dispatch(getTodos()),
    setPage: (page) => dispatch({ type: actionTypes.SET_PAGE, payload: page }),
    setPageSize: (pageSize) =>
      dispatch({ type: actionTypes.SET_PAGE_SIZE, payload: pageSize }),
    setTodosList: (todos, page, pageSize) =>
      dispatch(setTodosList(todos, page, pageSize)),
    setSearch: (value) =>
      dispatch({ type: actionTypes.SET_SEARCH_TEXT, payload: value }),
    fetchSearchedTodos: (text) => dispatch(setSearchText(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
