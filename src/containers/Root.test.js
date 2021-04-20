import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory, checkProps } from "../../test/testUtils";
import Root from "./Root";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Root store={store} />)
    .dive()
    .dive()
    .dive();
  return wrapper;
};

test("does not throw warning with expected props", () => {
  const expectedProps = {
    todos: [],
    todos_list: [],
    error: false,
    fetchTodos: () => {},
  };
  checkProps(Root, expectedProps);
});
