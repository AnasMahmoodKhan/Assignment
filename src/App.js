import React, { useEffect } from "react";
import { getTodos, setTodosList } from "./actions";
import { connect } from "react-redux";
import "./App.css";
import { DataTable, Paginator } from "lucid-ui";
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
      ) : todos_list.length > 0 ? (
        <React.Fragment>
          <div className="paginator-container">
            <Paginator
              data-test="Paginator"
              hasPageSizeSelector
              pageSizeOptions={[10, 25, 50]}
              totalCount={todos.length || 0}
              SingleSelect={{
                DropMenu: { direction: "down" },
              }}
              onPageSelect={(pageSelected) => setPage(pageSelected)}
              onPageSizeSelect={(pageSizeSelected) => {
                setPageSize(pageSizeSelected);
                setPage(0);
              }}
            />
          </div>
          <div>
            <DataTable data-test="DataTable" data={todos_list} minRows={10}>
              {columns.map((column, i) => (
                <DataTable.Column
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
      ) : (
        <span data-test="Loading">Loading...</span>
      )}
    </div>
  );
};

const mapStateToProps = (store) => {
  const { todos, page, page_size, todos_list, error } = store.reducer;
  return { todos, page, page_size, todos_list, error };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTodos: () => dispatch(getTodos()),
    setPage: (page) => dispatch({ type: actionTypes.SET_PAGE, payload: page }),
    setPageSize: (pageSize) =>
      dispatch({ type: actionTypes.SET_PAGE_SIZE, payload: pageSize }),
    setTodosList: (todos, page, pageSize) =>
      dispatch(setTodosList(todos, page, pageSize)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
