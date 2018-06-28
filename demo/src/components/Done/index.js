import { connect } from "react-redux";

import Done from "./Done";
import { removeTodo } from "../../state/todos/actionsCreators";

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

export default connect(mapStateToProps, { removeTodo })(Done);
