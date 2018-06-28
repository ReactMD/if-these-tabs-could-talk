import {
  INSTANCE_REGISTER,
  INSTANCE_UNREGISTER,
  INSTANCE_CONNECT,
  INSTANCE_DISCONNECT
} from "./actions";

export const registerInstance = () => (dispatch, _, tabTalk) => {
  dispatch(
    tabTalk(
      {
        type: INSTANCE_REGISTER
      },
      true
    )
  );
};

export const closeInstance = () => (dispatch, _, tabTalk) => {
  dispatch(
    tabTalk({
      type: INSTANCE_UNREGISTER
    })
  );
};

export const connectInstance = instance => (dispatch, _, tabTalk) => {
  dispatch(
    tabTalk({
      type: INSTANCE_CONNECT,
      communicateWith: instance
    })
  );
};

export const disconnectInstance = instance => (dispatch, _, tabTalk) => {
  dispatch(
    tabTalk({
      type: INSTANCE_DISCONNECT,
      disconnect: instance
    })
  );
};
