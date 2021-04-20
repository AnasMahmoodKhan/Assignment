import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory, checkProps } from "../../test/testUtils";
import { DataTable, Paginator, SearchField } from "lucid-ui";
import Root from "./Root";
import App from "./App";

const mockTodos = [
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
];

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Root store={store} />)
    .dive()
    .dive()
    .dive();
  return wrapper;
};

const setupWithStore = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Root store={store} />)
    .dive()
    .dive()
    .dive();
  return { wrapper, store };
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
    test("should render DataTable when todo_list array contains data", () => {
      const component = findByTestAttr(
        setup({
          reducer: {
            error: false,
            todos_list: mockTodos,
            todos: mockTodos,
          },
        }),
        "DataTable"
      );
      expect(component).toHaveLength(1);
    });
  });
});

describe("DataTable Component", () => {
  test("should have data in DataTable when DataTable renders", () => {
    const wrap = setup({
      reducer: {
        error: false,
        todos_list: mockTodos,
      },
    });

    const dataTable = wrap.find(DataTable);
    expect(dataTable).toHaveLength(1);
    expect(dataTable.props().data).toEqual(mockTodos);
  });

  test("when no data in DataTable", () => {
    const wrap = setup();
    const dataTable = wrap.find(DataTable);
    expect(dataTable.props().data).toEqual([]);
  });
});

describe("SearchField Component", () => {
  let wrap;
  beforeEach(() => {
    wrap = setup();
  });
  test("should render SearchField with placeholder `Search by Title...`", () => {
    const searchField = wrap.find(SearchField);
    expect(searchField).toHaveLength(1);
    expect(searchField.props().placeholder).toEqual("Search by Title...");
  });
});

describe("SearchField", () => {
  let store;
  let wrapper;
  beforeEach(() => {
    const StoreWithWrapper = setupWithStore({
      reducer: { page: 1, search_text: "" },
    });
    store = StoreWithWrapper.store;
    wrapper = StoreWithWrapper.wrapper;
  });
  it("should dispatch changes to search_text on changes of searchField", () => {
    const search = wrapper.find(SearchField);
    search.simulate("change", "del");
    expect(store.getState().reducer.search_text).toEqual("del");
  });

  it("should reset page to 0 onSubmit of SearchField", () => {
    const search = wrapper.find(SearchField);
    search.simulate("submit");
    expect(store.getState().reducer.page).toEqual(0);
  });
});

describe("Paginator Component", () => {
  let store;
  let wrapper;
  beforeEach(() => {
    const StoreWithWrapper = setupWithStore({
      reducer: {
        page: 1,
        page_size: 0,
        todos_list: mockTodos,
      },
    });
    store = StoreWithWrapper.store;
    wrapper = StoreWithWrapper.wrapper;
  });
  test("should render Paginator with selectedPageIndex `0` and selectedPageSize `0`", () => {
    const paginator = wrapper.find(Paginator);
    expect(paginator).toHaveLength(1);
    expect(paginator.props().selectedPageIndex).toEqual(1);
    expect(paginator.props().selectedPageSizeIndex).toEqual(0);
  });

  test("should not render Paginator when todo_list is empty", () => {
    const StoreWithWrapper = setupWithStore({
      reducer: {
        page: 0,
        page_size: 0,
        todos_list: [],
      },
    });
    store = StoreWithWrapper.store;
    wrapper = StoreWithWrapper.wrapper;
    const paginator = wrapper.find(Paginator);
    expect(paginator).toHaveLength(0);
  });

  it("should update current page onPageSelect event", () => {
    const paginator = wrapper.find(Paginator);
    paginator.props().onPageSelect(3);
    expect(store.getState().reducer.page).toEqual(3);
  });

  it("should update pageSize onPageSizeSelect and reset currentPage to 0", () => {
    const paginator = wrapper.find(Paginator);

    paginator.props().onPageSizeSelect(2);
    expect(store.getState().reducer.page_size).toEqual(2);
    expect(store.getState().reducer.page).toEqual(0);
  });
});

test("does not throw warning with expected props", () => {
  const expectedProps = {
    todos: [],
    todos_list: [],
    error: false,
    fetchTodos: () => {},
  };
  checkProps(App, expectedProps);
});
