import React, { useState } from "react";
import { getTodos } from "./actions";
import { connect } from "react-redux";
import "./App.css";
import {
  DataTable,
  SuccessIcon,
  Paginator,
  TextField,
  DangerIcon,
} from "lucid-ui";

const App = ({ getTodos, todos }) => {
  const [itemsCount, setitemsCount] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [page, setPage] = useState(0);

  React.useEffect(() => {
    getTodos();
  }, [getTodos]);

  React.useEffect(() => {
    todos = todos.filter(
      (todo, i) =>
        (todo.completed = todo.completed ? <SuccessIcon /> : <DangerIcon />)
    );
  }, [todos]);

  React.useEffect(() => {
    setitemsCount(todos.length);
  }, [todos]);

  React.useEffect(() => {
    let list = todos;
    const pageSizes = [10, 25, 50];
    list = list.slice(
      page * pageSizes[pageSize],
      (page + 1) * pageSizes[pageSize]
    );

    setTodoList(list);
  }, [todos, pageSize, page]);

  let contents;
  if (todoList.length === 0) {
    contents = (
      <DataTable data-test="DataTable" data={todoList}>
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
          field="success"
          align="left"
          width={150}
        >
          Completed
        </DataTable.Column>
      </DataTable>
    );
  } else {
    contents = (
      <DataTable data-test="DataTable" data={todoList}>
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
          Last
        </DataTable.Column>
      </DataTable>
    );
  }

  return (
    <div className="App" data-test="App">
      <div className="paginator-container">
        <div className="App-paginator">
          Total number of items:
          <TextField
            data-test="TextField"
            style={{
              width: 45,
              textAlign: "center",
              marginLeft: 6,
            }}
            disabled
            value={itemsCount}
          />
        </div>
        <Paginator
          data-test="Paginator"
          hasPageSizeSelector
          pageSizeOptions={[10, 25, 50]}
          totalCount={itemsCount}
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

      <div>{contents}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { todos } = state;
  return { todos };
};

export default connect(mapStateToProps, { getTodos })(App);