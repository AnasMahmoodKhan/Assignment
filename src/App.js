import React, { useEffect } from "react";
import { getTodos, setSearchText, setTodosList } from "./actions";
import { connect } from "react-redux";
import "./App.css";
import { DataTable, Paginator, SearchField } from "lucid-ui";
import { actionTypes } from "./actions/actionTypes";

const App = ({
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
  const columns = [
    { field: "id", title: "ID", align: "left", width: 200 },
    {
      field: "title",
      title: "TITLE",
      align: "left",
      width: 400,
    },
    {
      field: "completed",
      title: "COMPLETED",
      align: "left",
      width: 200,
    },
  ];
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    setTodosList(todos, page, page_size);
  }, [page, page_size, todos]);

  return (
    <div className="App" data-test="App">
      {error ? (
        <span data-test="Error">Something Went Wrong!</span>
      ) : (
        <React.Fragment>
          <div className="SearchField">
            <SearchField
              placeholder={"Search by Title..."}
              onChange={(value) => setSearch(value)}
              isValid={search_text.length > 0}
              onSubmit={() => {
                setPage(0);
                setPageSize(0);
                fetchSearchedTodos(search_text);
              }}
            />
          </div>
          <div className="paginator-container">
            <Paginator
              data-test="Paginator"
              hasPageSizeSelector
              pageSizeOptions={[10, 25, 50]}
              totalCount={todos ? todos.length : 0}
              SingleSelect={{
                DropMenu: { direction: "down" },
              }}
              selectedPageIndex={page}
              selectedPageSizeIndex={page_size}
              onPageSelect={(pageSelected) => setPage(pageSelected)}
              onPageSizeSelect={(pageSizeSelected) => {
                setPageSize(pageSizeSelected);
                setPage(0);
              }}
            />
          </div>
          <div>
            <DataTable data-test="DataTable" data={todos_list} minRows={0}>
              {columns.map((column, i) => (
                <DataTable.Column
                  key={i}
                  field={column.field}
                  width={column.width}
                  align={column.align}
                >
                  {column.title}
                </DataTable.Column>
              ))}
            </DataTable>
          </div>
        </React.Fragment>
      )}
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
