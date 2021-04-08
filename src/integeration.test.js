import { storeFactory } from "../test/testUtils";
import { getTodos } from "./actions";

describe("getTodos action dispatcher", () => {
  describe("no fetch", () => {
    const todos = [];
    let store;
    const initialState = { todos };
    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test("should update state correctly", () => {
      store.dispatch(getTodos());
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        todos: [],
      };
      expect(newState).toEqual(expectedState);
    });
  });

  describe("todos fetch", () => {
    let store;
    const initialState = {
      todos: [
        {
          userId: 1,
          id: 2,
          title: "quis ut nam facilis et officia qui",
          completed: false,
        },
      ],
    };
    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test("should update state correctly", () => {
      store.dispatch(getTodos());
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        todos: [
          {
            userId: 1,
            id: 2,
            title: "quis ut nam facilis et officia qui",
            completed: false,
          },
        ],
      };
      expect(newState).toEqual(expectedState);
    });
  });
});