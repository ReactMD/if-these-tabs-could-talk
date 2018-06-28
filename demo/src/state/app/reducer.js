import shortid from "shortid";

export const defaultAppState = {
  name: "demo",
  instance: window.instance ? window.instance : shortid.generate()
};

const app = (state = defaultAppState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default app;
