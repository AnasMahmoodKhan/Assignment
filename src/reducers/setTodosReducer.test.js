import { actionTypes } from "../actions";
import setTodosReducer from "./setTodosReducer";

test('should return default initial state of "null" when no action is passed', () => {
  const newState = setTodosReducer(undefined, {});
  expect(newState).toStrictEqual([]);
});

test('should return state of array of todos upon receiving an action of type "SET_TODOS"', () => {
  const newState = setTodosReducer(undefined, {
    type: actionTypes.SET_TODOS,
    payload: "ok",
  });

  expect(newState).toBe("ok");
});