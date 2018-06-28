import thunk from "redux-thunk";

const talkingTabsMiddleware = worker => (action, updateHost) => (
  dispatch,
  getState
) => {
  const { name: app, instance } = getState().app;

  const actionWithInstance = {
    ...action,
    instance,
    app
  };

  worker.port.postMessage(actionWithInstance);
  if (updateHost) {
    return dispatch(actionWithInstance);
  }
};

export default worker => thunk.withExtraArgument(talkingTabsMiddleware(worker));
