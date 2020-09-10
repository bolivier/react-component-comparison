import React, { useState, useEffect } from "react";
import { initialState, getInitialState } from "./initialState";

let nextId = 3;
function todoFactory(label) {
  const id = nextId;
  nextId += 1;
  return {
    id,
    label,
  };
}

export function DirectFn({ visibility }) {
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

  const removeCompleted = () => {
    setTodos(todos.filter(({ completed }) => !completed));
  };

  const toggleCompleted = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const isCurrentlyVisible = todo => {
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

  return (
    <div>
      <ul>
        {todos.filter(isCurrentlyVisible).map(({ label, id, completed }) => (
          <li onClick={() => toggleCompleted(id)} key={id}>
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
          value={newInputVal}
          onChange={onChangeNewInputVal}
        />
        <button className="btn" onClick={addNewTodo}>
          add todo
        </button>
      </div>
      <button className="btn danger mt-2" onClick={removeCompleted}>
        remove completed
      </button>
    </div>
  );
}
DirectFn.defaultProps = {
  visibility: "all",
};
