import shortid from "shortid";
import { ADD_TODO, MARK_DONE, REMOVE_TODO } from "./actions";

export const addTodo = name => (dispatch, _, tabTalk) => {
  dispatch(
    tabTalk(
      {
        type: ADD_TODO,
        id: shortid.generate(),
        name
      },
      true
    )
  );
};

export const removeTodo = id => (dispatch, getState, tabTalk) => {
  const { todos } = getState();
  const index = todos.findIndex(todo => todo.id === id);
  dispatch(
    tabTalk(
      {
        type: REMOVE_TODO,
        index,
        broadcast: true
      },
      true
    )
  );
};

export const markDone = doneIds => (dispatch, getState, tabTalk) => {
  const { todos } = getState();

  const newTodos = [
    ...todos.map(todo => {
      if (doneIds.includes(todo.id)) {
        return {
          id: todo.id,
          name: todo.name,
          done: true
        };
      }
      return todo;
    })
  ];
  dispatch(
    tabTalk(
      {
        type: MARK_DONE,
        todos: newTodos,
        broadcast: true
      },
      true
    )
  );
};

export const markAllDone = () => (dispatch, getState, tabTalk) => {
  const { todos } = getState();

  const newTodos = [
    ...todos.map(todo => {
      return {
        id: todo.id,
        name: todo.name,
        done: true
      };
    })
  ];
  dispatch(
    tabTalk(
      {
        type: MARK_DONE,
        todos: newTodos,
        broadcast: true
      },
      true
    )
  );
};
