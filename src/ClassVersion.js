import React from "react";
import { initialState, getInitialState } from "./initialState";

class TodoFactory {
  constructor() {
    this.nextId = 3;
  }

  todo(label) {
    const id = this.nextId;
    this.nextId = this.nextId + 1;
    return {
      id,
      label,
    };
  }
}

export class ClassVersion extends React.Component {
  static defaultProps = {
    visibility: "all",
  };

  constructor(props) {
    super(props);
    this.todoFactory = new TodoFactory();
    this.state = { todos: [], newInputVal: "" };
  }

  componentDidMount() {
    getInitialState().then(todos => {
      this.setState({ todos });
    });
  }

  onChangeNewInputVal = e => {
    e.preventDefault();
    this.setState({ newInputVal: e.target.value });
  };

  addNewTodo = e => {
    e.preventDefault();
    const todo = this.todoFactory.todo(this.state.newInputVal);
    const newTodos = [...this.state.todos, todo];
    this.setState({
      todos: newTodos,
      newInputVal: "",
    });
  };

  removeCompleted = () => {
    this.setState({
      todos: this.state.todos.filter(({ completed }) => !completed),
    });
  };

  toggleCompleted = id => {
    this.setState({
      todos: this.state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    });
  };

  isCurrentlyVisible = todo => {
    const { visibility } = this.props;
    if (visibility === "all") {
      return true;
    }
    if (visibility === "completed") {
      return todo.completed;
    }
    if (visibility === "active") {
      return !todo.completed;
    }
  };

  render() {
    return (
      <div>
        <ul className="m-5">
          {this.state.todos
            .filter(this.isCurrentlyVisible)
            .map(({ label, id, completed }) => (
              <li
                className="list-disc"
                onClick={() => this.toggleCompleted(id)}
                key={id}
              >
                <div
                  className="cursor-pointer"
                  style={{
                    textDecoration: completed ? "line-through" : "none",
                  }}
                >
                  {label}
                </div>
              </li>
            ))}
        </ul>
        <div style={{ display: "flex" }}>
          <label className="hidden" htmlFor="newInput">
            Todo label
          </label>
          <input
            id="newInput"
            className="border rounded p-2 mr-2"
            placeholder="label"
            value={this.state.newInputVal}
            onChange={this.onChangeNewInputVal}
          />
          <button className="btn" onClick={this.addNewTodo}>
            add todo
          </button>
        </div>
        <button className="btn danger mt-2" onClick={this.removeCompleted}>
          remove completed
        </button>
      </div>
    );
  }
}
