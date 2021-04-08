import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import { findByTestAttr, storeFactory } from "../test/testUtils";

const setup = (initialState = { todos: [] }) => {
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
  test("should render textField", () => {
    const TextField = findByTestAttr(setup(), "TextField");
    expect(TextField).toHaveLength(1);
  });
  test("should render paginator", () => {
    const paginator = findByTestAttr(setup(), "Paginator");
    expect(paginator).toHaveLength(1);
  });
  test("should render DataTable", () => {
    const DataTable = findByTestAttr(setup(), "DataTable");
    expect(DataTable).toHaveLength(1);
  });
  test("should render DataTable Columns", () => {
    const DataTableColumns = findByTestAttr(setup(), "DataTableColumns");
    expect(DataTableColumns).toBeTruthy();
  });
});

