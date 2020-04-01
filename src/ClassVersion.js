import React from "react";
import { initialState } from "./initialState";

class TodoFactory {
  constructor() {
    this.nextId = 3;
  }

  todo(label) {
    const id = this.nextId;
    this.nextId = this.nextId + 1;
    return {
      id,
      label
    }
  }
}

export class ClassVersion extends React.Component {
  constructor(props) {
    super(props);
    this.todoFactory = new TodoFactory();
    this.state = { todos: initialState, newInputVal: "" };
  }

  onChangeNewInputVal = e => {
    e.preventDefault();
    this.setState({ newInputVal: e.target.value });
  };

  addNewTodo = e => {
    e.preventDefault();
    const todo = this.todoFactory.todo(this.state.newInputVal)
    const newTodos = [...this.state.todos, todo];
    this.setState({
      todos: newTodos,
      newInputVal: ""
    });
  };

  removeTodo = id => {
    const newTodos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos: newTodos });
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.todos.map(({ label, id }) => (
            <li onClick={() => this.removeTodo(id)} key={id}>
              {label}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex" }}>
          <label htmlFor="newInput">Todo label</label>
          <input
            id="newInput"
            placeholder="label"
            value={this.state.newInputVal}
            onChange={this.onChangeNewInputVal}
          />
          <button onClick={this.addNewTodo}>add todo</button>
        </div>
      </div>
    );
  }
}
