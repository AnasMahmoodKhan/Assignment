import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { getTodos, setSearchText, setTodosList } from "./";
import { actionTypes } from "./actionTypes";

describe("getTodos action creater", () => {
  let store;
  beforeEach(() => {
    moxios.install();
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    store = mockStore({
      reducer: {
        todos: [],
        page: 0,
        page_size: 0,
        todos_list: [],
        error: false,
        search_text: "",
      },
    });
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("should add todos to state", () => {
    const todos = [
      {
        completed: false,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        userId: 1,
      },
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: todos,
      });
    });
    const expectedActions = [{ type: actionTypes.SET_TODOS, payload: todos }];

    return store.dispatch(getTodos()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("should add `error : true` to state if fetch request fails", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: true,
      });
    });

    const expectedActions = [
      {
        type: actionTypes.SET_TODOS,
        payload: [],
      },
      {
        type: actionTypes.SET_ERROR,
        payload: true,
      },
    ];

    return store.dispatch(getTodos()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("should add todolist to state", () => {
    const list = [
      {
        completed: false,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        userId: 1,
      },
      {
        completed: true,
        id: 3,
        title: "fugiat veniam minus",
        userId: 1,
      },
    ];
    const expectedActions = [
      {
        type: actionTypes.SET_TODOS_LIST,
        payload: list,
      },
    ];

    store.dispatch(setTodosList(list, 0, 0));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe("setSearchText action creater", () => {
  let store;
  beforeEach(() => {
    moxios.install();
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    store = mockStore({
      reducer: {
        todos: [],
        page: 0,
        page_size: 0,
        todos_list: [],
        error: false,
        search_text: "",
      },
    });
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("should add todos to state", () => {
    const todos = [
      {
        completed: false,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        userId: 1,
      },
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: todos,
      });
    });

    const expectedActions = [
      {
        type: actionTypes.SET_TODOS,
        payload: todos,
      },
    ];

    return store.dispatch(setSearchText("")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("should add `error : true` to state if fetch request fails", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: true,
      });
    });

    const expectedActions = [
      {
        type: actionTypes.SET_TODOS,
        payload: [],
      },
      {
        type: actionTypes.SET_ERROR,
        payload: true,
      },
    ];

    return store.dispatch(setSearchText("")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
