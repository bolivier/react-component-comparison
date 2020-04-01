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
      label
    };
  }
}

export class ClassVersion extends React.Component {
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
      newInputVal: ""
    });
  };

  removeTodo = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    const newTodos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos: newTodos });
  };

  toggleCompleted = id => {
    this.setState({
      todos: this.state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
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
        <ul>
          {this.state.todos
            .filter(this.isCurrentlyVisible)
            .map(({ label, id, completed }) => (
              <li onClick={() => this.toggleCompleted(id)} key={id}>
                <span
                  style={{
                    textDecoration: completed ? "line-through" : "none"
                  }}
                >
                  {label}
                </span>
                <button data-testid={id} onClick={e => this.removeTodo(id, e)}>
                  X
                </button>
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
