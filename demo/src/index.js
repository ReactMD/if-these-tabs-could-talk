import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";

import "./components/App/App.css";
import App from "./components/App";
import rootReducer from "./state/reducers";

import talkingTabsMiddleware from "./middleware/talkingTabsMiddleware";
import instanceMiddleware from "./middleware/instanceMiddleware";

import {
  INSTANCE_REGISTER,
  INSTANCE_OPEN,
  INSTANCE_UNREGISTER,
  INSTANCE_DISCONNECT
} from "./state/instances/actions";

const worker = new SharedWorker("/worker.js");

const store = createStore(
  rootReducer,
  applyMiddleware(
    talkingTabsMiddleware(worker),
    instanceMiddleware(worker),
    logger
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

worker.port.onmessage = ({ data: action }) => {
  const { instance } = store.getState().app;
  const { instances } = store.getState();

  // check to see if the action instance is one of the instance keys that is connected
  const messageFromConnectedInstance = Object.keys(instances).some(app =>
    Object.keys(instances[app]).some(
      instanceKey =>
        instances[app][instanceKey] && instanceKey === action.instance
    )
  );

  // don't pass through the instance disconnect function if the 'disconnect' field doesn't equal this instance
  if (
    action &&
    action.type === INSTANCE_DISCONNECT &&
    action.disconnect !== instance
  ) {
    return;
  }

  if (
    (action && action.type === INSTANCE_REGISTER) ||
    (action && action.type === INSTANCE_OPEN) ||
    (action && action.type === INSTANCE_UNREGISTER) ||
    instance === action.communicateWith ||
    messageFromConnectedInstance
  ) {
    store.dispatch(action);
  }
};

worker.port.start();
