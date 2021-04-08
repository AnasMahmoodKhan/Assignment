import moxios from "moxios";

import { storeFactory } from "../../test/testUtils";
import { getTodos } from "./";

describe("getTodos action creater", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("should add todos to state", () => {
    const todos = [
      {
        userId: 1,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        completed: false,
      },
    ];

    let store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: todos,
      });
    });

    return store.dispatch(getTodos()).then(() => {
      const newState = store.getState();
      expect(newState.todos).toBe(todos);
    });
  });
});