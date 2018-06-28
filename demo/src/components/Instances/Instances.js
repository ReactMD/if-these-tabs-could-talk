import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { makeGetInstanceDetails } from "../../state/selectors";
import {
  connectInstance,
  disconnectInstance
} from "../../state/instances/actionCreators";

class Instances extends PureComponent {
  render() {
    const {
      instance,
      instances,
      connectInstance,
      disconnectInstance
    } = this.props;
    const connectedTabs = instances
      .filter(instanceObj => instanceObj.connected)
      .map((instanceObj, i) => (
        <li key={i} style={{ marginBottom: "10px" }}>
          <span>{instanceObj.instance}</span>&nbsp;
          <button
            className="btn btn-default btn-xs"
            onClick={() => disconnectInstance(instanceObj.instance)}
          >
            Disconnect
          </button>
        </li>
      ));
    const otherTabs = instances
      .filter(instanceObj => !instanceObj.connected)
      .map((instanceObj, i) => (
        <li key={i} style={{ marginBottom: "10px" }}>
          <span>{instanceObj.instance}</span>&nbsp;
          <button
            className="btn btn-primary btn-xs"
            onClick={() => connectInstance(instanceObj.instance)}
          >
            Connect
          </button>
        </li>
      ));
    return (
      <div className="segment">
        <h3>Tabs:</h3>
        <p><b>Self:</b> {instance}</p>
        <p><b>Connected tabs:</b></p>
        <ul>
          {connectedTabs}
        </ul>
        <p><b>Others:</b></p>
        <ul>
          {otherTabs}
        </ul>
      </div>
    );
  }
}

const makeMapStateToProps = () => {
  const getInstanceDetails = makeGetInstanceDetails(true);
  return state => {
    return {
      instance: state.app.instance,
      instances: getInstanceDetails(state)
    };
  };
};

export default connect(makeMapStateToProps, {
  connectInstance,
  disconnectInstance
})(Instances);
