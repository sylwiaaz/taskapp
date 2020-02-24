import { createStore } from "redux";
import combineReducer from "./reducers/index";

export const store = createStore(combineReducer);

store.subscribe(() => {
  console.log(store.getState());
});
