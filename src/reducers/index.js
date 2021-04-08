import { combineReducers } from "redux";
import todos from "./setTodosReducer";

export default combineReducers({ todos });