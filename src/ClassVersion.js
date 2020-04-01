import React from "react";
import { initialState } from "./initialState";

export class ClassVersion extends React.Component {
  state = { todos: initialState, newInputVal: "" };

  onChangeNewInputVal = e => {
    e.preventDefault();
    this.setState({ newInputVal: e.target.value });
  };

  addNewTodo = e => {
    e.preventDefault();
    const newTodos = [...this.state.todos, { label: this.state.newInputVal }];
    this.setState({
      todos: newTodos,
      newInputVal: ""
    });
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.todos.map(({ label }) => (
            <li key={label}>{label}</li>
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
