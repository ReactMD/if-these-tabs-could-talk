import { combineReducers } from "redux";

import app from "./app/reducer";
import instances from "./instances/reducer";
import todos from "./todos/reducer";

export default combineReducers({
  app,
  instances,
  todos
});
