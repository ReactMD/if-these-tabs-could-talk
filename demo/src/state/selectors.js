import { createSelector } from "reselect";

const getInstance = state => state.app.instance;
const getInstances = state => state.instances;

export const makeGetInstanceDetails = excludeSelf =>
  createSelector([getInstance, getInstances], (instance, instances) => {
    const instanceDetails = Object.keys(instances).reduce(
      (result, app) =>
        result.concat(
          Object.keys(instances[app]).map(instance => ({
            app,
            instance,
            connected: instances[app][instance]
          }))
        ),
      []
    );

    if (excludeSelf) {
      return instanceDetails.filter(
        instanceObj => instanceObj.instance !== instance
      );
    }
    return instanceDetails;
  });