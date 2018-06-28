import {
  INSTANCE_REGISTER,
  INSTANCE_OPEN,
  INSTANCE_UNREGISTER,
  INSTANCE_CONNECT,
  INSTANCE_CONNECTED,
  INSTANCE_DISCONNECT,
  INSTANCE_DISCONNECTED
} from "./actions";

export const defaultInstancesState = {};

const instances = (state = defaultInstancesState, action) => {
  switch (action.type) {
    case INSTANCE_REGISTER:
    case INSTANCE_OPEN:
      return {
        ...state,
        [action.app]: state[action.app]
          ? {
              ...state[action.app],
              [action.instance]: !!state[action.app][action.instance]
            }
          : { [action.instance]: false }
      };
    case INSTANCE_UNREGISTER:
      if (
        !state[action.app] ||
        !state[action.app].hasOwnProperty(action.instance)
      ) {
        return;
      }

      const { [action.instance]: omit, ...result } = state[action.app];
      return {
        ...state,
        [action.app]: result
      };
    case INSTANCE_CONNECT:
    case INSTANCE_CONNECTED:
      return {
        ...state,
        [action.app]: state[action.app]
          ? { ...state[action.app], [action.instance]: true }
          : { [action.instance]: true }
      };
    case INSTANCE_DISCONNECT:
    case INSTANCE_DISCONNECTED:
      return {
        ...state,
        [action.app]: state[action.app]
          ? { ...state[action.app], [action.instance]: false }
          : { [action.instance]: false }
      };
    default:
      return state;
  }
};

export default instances;
