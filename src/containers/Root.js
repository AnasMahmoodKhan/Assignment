import React from "react";
import { connect } from "react-redux";

import { getTodos, setSearchText, setTodosList } from "../actions";
import { actionTypes } from "../actions/actionTypes";
import App from "./App";
import PropTypes from "prop-types";

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

Root.defaultProps = {
  page: 0,
  todos: [],
  page_size: 0,
  todos_list: [],
  error: false,
  search_text: "",
  setPage: () => {},
  fetchTodos: () => {},
  setPageSize: () => {},
  setTodosList: () => {},
  setSearch: () => {},
  fetchSearchedTodos: () => {},
};

Root.propTypes = {
  page: PropTypes.number,
  todos: PropTypes.array.isRequired,
  page_size: PropTypes.number,
  todos_list: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired,
  search_text: PropTypes.string,
  fetchTodos: PropTypes.func.isRequired,
  setPage: PropTypes.func,
  setPageSize: PropTypes.func,
  setTodosList: PropTypes.func,
  setSearch: PropTypes.func,
  fetchSearchedTodos: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
