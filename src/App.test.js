import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import { findByTestAttr, storeFactory } from "../test/testUtils";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<App store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("App component", () => {
  test("should render component without error", () => {
    const component = findByTestAttr(setup(), "App");
    expect(component).toHaveLength(1);
  });

  describe("condintional rendering for fetch requests", () => {
    test("should render `Something Went Wrong!` message in case of api fetch request failure", () => {
      const component = findByTestAttr(
        setup({ reducer: { error: true } }),
        "Error"
      );
      expect(component.text()).toBe("Something Went Wrong!");
    });

    test("should not render `Something Went Wrong!` message in case of api fetch request failure", () => {
      const component = findByTestAttr(
        setup({ reducer: { error: false, todos_list: [] } }),
        "Error"
      );
      expect(component).toHaveLength(0);
    });
  });

  describe("condintional rendering todo_list", () => {
    test("should render `Loading...` in case of todo_list being an empty array", () => {
      const component = findByTestAttr(
        setup({ reducer: { error: false, todos_list: [] } }),
        "Loading"
      );
      expect(component.text()).toBe("Loading...");
    });

    test("should render DataTable when todo_list array contains data", () => {
      const component = findByTestAttr(
        setup({
          reducer: {
            error: false,
            todos_list: [
              {
                userId: 1,
                id: 1,
                title: "delectus aut autem",
                completed: false,
              },
              {
                userId: 1,
                id: 2,
                title: "quis ut nam facilis et officia qui",
                completed: false,
              },
              {
                userId: 1,
                id: 3,
                title: "fugiat veniam minus",
                completed: false,
              },
            ],
            todos: [
              {
                userId: 1,
                id: 1,
                title: "delectus aut autem",
                completed: false,
              },
              {
                userId: 1,
                id: 2,
                title: "quis ut nam facilis et officia qui",
                completed: false,
              },
              {
                userId: 1,
                id: 3,
                title: "fugiat veniam minus",
                completed: false,
              },
            ],
          },
        }),
        "DataTable"
      );
      expect(component).toHaveLength(1);
    });
  });
});
