import {
  INSTANCE_REGISTER,
  INSTANCE_OPEN,
  INSTANCE_CONNECT,
  INSTANCE_CONNECTED,
  INSTANCE_DISCONNECT,
  INSTANCE_DISCONNECTED
} from "../state/instances/actions";

const instanceMiddleware = worker => {
  return ({ dispatch, getState }) => next => action => {
    const { instance, name: app } = getState().app;

    // if INSTANCE_REGISTER and it didn't come from self, send back to tell them that we are open
    if (action.type === INSTANCE_REGISTER && action.instance !== instance) {
      worker.port.postMessage({
        type: INSTANCE_OPEN,
        app,
        instance
      });
    }

    // if INSTANCE_CONNECT send back that we are connected
    if (action.type === INSTANCE_CONNECT) {
      worker.port.postMessage({
        type: INSTANCE_CONNECTED,
        app,
        instance,
        communicateWith: action.instance
      });
    }

    // if INSTANCE_DISCONNECT send back that we are disconnected
    if (action.type === INSTANCE_DISCONNECT) {
      worker.port.postMessage({
        type: INSTANCE_DISCONNECTED,
        app,
        instance
      });
    }
    return next(action);
  };
};

export default instanceMiddleware;
