import React, { useState, useReducer } from "react";
import { initialState } from "./initialState";

export function DirectFn() {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [newInputVal, setNewInputVal] = useState("");

  const addNewTodo = e => {
    e.preventDefault();
    dispatch({
        type: 'todos/add',
        newInputVal
    })
    setNewInputVal(newInputVal);
  };

  return (
    <div>
      <ul>
        {todos.map(({ label }) => (
          <li>{label}</li>
        ))}
      </ul>
      <div style={{ display: "flex" }}>
        <input
          placeholder="label"
          value={newInputVal}
          onChange={e => setNewInputVal(e.target.value)}
        />
        <button onClick={addNewTodo}>add todo</button>
      </div>
    </div>
  );
}

function todoReducer(state, { type, payload }) {
  switch (type) {
    case "todo/add":
      return [...state, { label: payload }];
    default:
      return state;
  }
}
