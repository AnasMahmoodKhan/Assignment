import { actionTypes } from "../actions";
import reducer from "./reducer";

test('should return default initial state of "null" when no action is passed', () => {
  const newState = reducer(undefined, {});
  expect(newState).toStrictEqual({"error": false, "page": 0, "page_size": 0, "todos": [], "todos_list": []});
});

test('should return state of array of todos upon receiving an action of type "SET_TODOS"', () => {
  const newState = reducer(undefined, {
    type: actionTypes.SET_TODOS,
    payload: [{ userId: 1, id: 1, title: "delectus aut autem" }],
  });

  expect(newState).toStrictEqual({
    error: false,
    page: 0,
    page_size: 0,
    todos: [{ userId: 1, id: 1, title: "delectus aut autem" }],
    todos_list: [],
  });
});
