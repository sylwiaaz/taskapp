import { combineReducers } from "redux";
import columnReducer from "./columnReducer";
import sidebarReducer from "./sidebarReducer";

export default combineReducers({
  columns: columnReducer,
  sidebar: sidebarReducer
});
