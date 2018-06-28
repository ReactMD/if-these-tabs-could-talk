import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";

import {
  registerInstance,
  closeInstance
} from "../../state/instances/actionCreators";

import Todo from "../Todo";
import Done from "../Done";
import Instances from "../Instances";

class App extends PureComponent {
  componentWillMount() {
    const { registerInstance, closeInstance } = this.props;
    registerInstance();
    window.onbeforeunload = closeInstance;
  }

  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
                If these tabs could talk?
              </a>
            </div>
          </div>
        </nav>
        <div className="container" style={{ marginTop: "50px" }}>
          <div className="row">
            <div className="col-md-6">
              <Todo />
            </div>
            <div className="col-md-6">
              <Done />
            </div>
          </div>
        </div>
        <div className="container" style={{ marginTop: "50px" }}>
          <div className="row">
            <div className="col-md-12">
              <Instances />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, {
  registerInstance,
  closeInstance
})(App);
