import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import { findByTestAttr, storeFactory } from "../test/testUtils";
import { DataTable, Paginator, SearchField } from "lucid-ui";

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

describe("DataTable Component", () => {
  test("should have data in DataTable when DataTable renders", () => {
    const stor = storeFactory({
      reducer: {
        error: false,
        todos_list: [
          {
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: false,
          },
        ],
      },
    });
    const wrap = shallow(<App store={stor} />)
      .dive()
      .dive();
    const dataTable = wrap.find(DataTable);
    expect(dataTable).toHaveLength(1);
    expect(dataTable.props().data).toEqual([
      {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
      },
    ]);
  });

  test("when no data in DataTable", () => {
    const stor = storeFactory();
    const wrap = shallow(<App store={stor} />)
      .dive()
      .dive();
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

describe("Paginator Component", () => {
  let wrap;
  beforeEach(() => {
    wrap = setup();
  });
  test("should render Paginator with selectedPageIndex `0` and selectedPageSize `0`", () => {
    const paginator = wrap.find(Paginator);
    expect(paginator).toHaveLength(1);
    expect(paginator.props().selectedPageIndex).toEqual(0);
    expect(paginator.props().selectedPageSizeIndex).toEqual(0);
  });
});

describe("SearchFieldf", () => {
  let store;
  let wrapper;
  beforeEach(() => {
    store = storeFactory({ reducer: { page: 1, search_text: "" } });

    wrapper = shallow(<App store={store} />)
      .dive()
      .dive();
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

describe("Paginator", () => {
  let store;
  let wrapper;
  beforeEach(() => {
    store = storeFactory({ reducer: { page: 1, page_size: 0 } });

    wrapper = shallow(<App store={store} />)
      .dive()
      .dive();
  });
  it("should dispatch changes to search_text on changes of searchField", () => {
    const search = wrapper.find(Paginator);
    search.props().onPageSelect(3);
    expect(store.getState().reducer.page).toEqual(3);
  });

  it("should reset page to 0 onSubmit of SearchField", () => {
    const search = wrapper.find(Paginator);

    search.props().onPageSizeSelect(2);
    expect(store.getState().reducer.page_size).toEqual(2);
  });
});
