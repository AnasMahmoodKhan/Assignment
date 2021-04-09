import moxios from "moxios";
import { getTodos, setTodosList } from "./";
import { storeFactory } from "../../test/testUtils";

describe("getTodos action creater", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  let store = storeFactory();

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

    return store.dispatch(getTodos()).then(() => {
      const stateCalled = store.getState();
      expect(stateCalled.reducer.todos).toEqual(todos);
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

    return store.dispatch(getTodos()).then(() => {
      const newState = store.getState();
      expect(newState.reducer.error).toBe(true);
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
    store.dispatch(setTodosList(list, 0, 0));
    const newState = store.getState();
    expect(newState.reducer.todos_list).toStrictEqual(list);
  });
});
