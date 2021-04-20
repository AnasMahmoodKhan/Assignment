import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "./styles/App.css";

import { DataTable, Paginator, SearchField } from "lucid-ui";
import { columns } from "../utils/columns";

const {
  EmptyStateWrapper,
  EmptyStateWrapper: { Title },
} = DataTable;

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
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    setTodosList(todos, page, page_size);
  }, [page, page_size, todos]);

  const onSubmitHandler = () => {
    setPage(0);
    setPageSize(0);
    fetchSearchedTodos(search_text);
  };

  const onPageSizeSelectHandler = (pageSizeSelected) => {
    setPageSize(pageSizeSelected);
    setPage(0);
  };

  return (
    <div className="App" data-test="App">
      {error ? (
        <span data-test="Error">Something Went Wrong!</span>
      ) : (
        <React.Fragment>
          <div className="SearchField" data-test="SearchField">
            <SearchField
              placeholder={"Search by Title..."}
              onChange={(value) => setSearch(value)}
              value={search_text}
              onSubmit={onSubmitHandler}
            />
          </div>

          <div>
            {todos_list
              ? todos_list.length > 0 && (
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
                      onPageSizeSelect={(pageSizeSelected) =>
                        onPageSizeSelectHandler(pageSizeSelected)
                      }
                    />
                  </div>
                )
              : null}
            <DataTable data-test="DataTable" data={todos_list} minRows={0}>
              <EmptyStateWrapper style={{ margin: "25px" }}>
                <Title>Todos searched not found.</Title>
              </EmptyStateWrapper>
              {todos_list
                ? todos_list.length > 0 &&
                  columns.map((column, i) => (
                    <DataTable.Column
                      key={i}
                      field={column.field}
                      width={column.width}
                      align={column.align}
                    >
                      {column.title}
                    </DataTable.Column>
                  ))
                : null}
            </DataTable>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

App.defaultProps = {
  page: 0,
  todos: [],
  page_size: 0,
  todos_list: [],
  error: false,
  search_text: "",
};

App.propTypes = {
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

export default App;
