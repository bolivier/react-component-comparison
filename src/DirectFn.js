import React, { useState, useEffect } from "react";
import { getInitialState } from "./initialState";

let nextId = 3;
function todoFactory(label) {
  const id = nextId;
  nextId += 1;
  return {
    label,
    id
  };
}

export function DirectFn() {
  const [todos, setTodos] = useState([]);
  const [newInputVal, setNewInputVal] = useState("");

  useEffect(() => {
    getInitialState().then(todos => {
      setTodos(todos);
    });
  }, []);

  const onChangeNewInputVal = e => {
    e.preventDefault();
    setNewInputVal(e.target.value);
  };

  const addNewTodo = e => {
    e.preventDefault();
    const todo = todoFactory(newInputVal);
    const newTodos = [...todos, todo];
    setTodos(newTodos);
    setNewInputVal("");
  };

  const removeTodo = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleCompleted = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <ul>
        {todos.map(({ label, id, completed }) => (
          <li onClick={() => toggleCompleted(id)} key={id}>
            <span
              style={{ textDecoration: completed ? "line-through" : "none" }}
            >
              {label}
            </span>
            <button data-testid={id} onClick={(e) => removeTodo(id, e)}>
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
          value={newInputVal}
          onChange={onChangeNewInputVal}
        />
        <button onClick={addNewTodo}>add todo</button>
      </div>
    </div>
  );
}
