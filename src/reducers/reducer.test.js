import { actionTypes } from "../actions/actionTypes";
import reducer from "./reducer";

test('should return default initial state of "null" when no action is passed', () => {
  const newState = reducer(undefined, {});
  expect(newState).toStrictEqual({
    error: false,
    page: 0,
    page_size: 0,
    todos: [],
    todos_list: [],
    search_text: "",
  });
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
    search_text: "",
  });
});

test('should return state of page upon receiving an action of type "SET_PAGE"', () => {
  const newState = reducer(undefined, {
    type: actionTypes.SET_PAGE,
    payload: 2,
  });

  expect(newState).toStrictEqual({
    error: false,
    page: 2,
    page_size: 0,
    todos: [],
    todos_list: [],
    search_text: "",
  });
});

test('should return state of page_size upon receiving an action of type "SET_PAGE_SIZE"', () => {
  const newState = reducer(undefined, {
    type: actionTypes.SET_PAGE_SIZE,
    payload: 1,
  });

  expect(newState).toStrictEqual({
    error: false,
    page: 0,
    page_size: 1,
    todos: [],
    todos_list: [],
    search_text: "",
  });
});

test('should return state of array of todos_list upon receiving an action of type "SET_TODOS_LIST"', () => {
  const newState = reducer(undefined, {
    type: actionTypes.SET_TODOS_LIST,
    payload: [{ userId: 1, id: 1, title: "delectus aut autem" }],
  });

  expect(newState).toStrictEqual({
    error: false,
    page: 0,
    page_size: 0,
    todos: [],
    todos_list: [{ userId: 1, id: 1, title: "delectus aut autem" }],
    search_text: "",
  });
});

test('should return state of error upon receiving an action of type "SET_ERROR"', () => {
  const newState = reducer(undefined, {
    type: actionTypes.SET_ERROR,
    payload: true,
  });

  expect(newState).toStrictEqual({
    error: true,
    page: 0,
    page_size: 0,
    todos: [],
    todos_list: [],
    search_text: "",
  });
});

test('should return state of search_text upon receiving an action of type "SET_SEARCH_TEXT"', () => {
  const newState = reducer(undefined, {
    type: actionTypes.SET_SEARCH_TEXT,
    payload: "dele",
  });

  expect(newState).toStrictEqual({
    error: false,
    page: 0,
    page_size: 0,
    todos: [],
    todos_list: [],
    search_text: "dele",
  });
});
