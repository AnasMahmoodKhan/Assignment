import React, { useEffect } from "react";
import { actionTypes, getTodos, setTodosList } from "./actions";
import { connect } from "react-redux";
import "./App.css";
import { DataTable, Paginator } from "lucid-ui";

const App = ({
  fetchTodos,
  setPage,
  setPageSize,
  setTodosList,
  page,
  todos,
  page_size,
  todos_list,
}) => {
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    setTodosList(todos, page, page_size);
  }, [page, page_size, setTodosList, todos]);

  return (
    <div className="App" data-test="App">
      <div className="paginator-container">
        <div className="App-paginator"></div>
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
        <DataTable data-test="DataTable" data={todos_list}>
          <DataTable.Column
            data-test="DateTableColumns"
            field="id"
            align="left"
            width={200}
          >
            ID
          </DataTable.Column>

          <DataTable.Column
            data-test="DateTableColumns"
            field="title"
            align="left"
            width={400}
          >
            First
          </DataTable.Column>

          <DataTable.Column
            data-test="DateTableColumns"
            field="completed"
            align="left"
            width={150}
          >
            Completed
          </DataTable.Column>
        </DataTable>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => {
  const { todos, page, page_size, todos_list } = store.reducer;
  return { todos, page, page_size, todos_list };
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
