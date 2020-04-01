import React, { useState, useReducer } from "react";
import { initialState as initialTodos } from "./initialState";

const initialState = {
  todos: initialTodos,
  inputVal: ""
};

export function IdiomaticFn() {
  const [{ todos, inputVal }, dispatch] = useReducer(todoReducer, initialState);

  const addNewTodo = e => {
    e.preventDefault();
    dispatch({
      type: "todo/add",
      payload: inputVal
    });
  };

  return (
    <div>
      <ul>
        {todos.map(({ label }) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
      <div style={{ display: "flex" }}>
        <label htmlFor="newInput">Todo label</label>
        <input
          id="newInput"
          placeholder="label"
          value={inputVal}
          onChange={e =>
            dispatch({ type: "input-change", payload: e.target.value })
          }
        />
        <button onClick={addNewTodo}>add todo</button>
      </div>
    </div>
  );
}

function todoReducer(state, { type, payload }) {
  const { todos, inputVal } = state;

  switch (type) {
    case "todo/add":
      return { ...state, todos: [...todos, { label: payload }], inputVal: "" };
    case "input-change":
      return {
        ...state,
        inputVal: payload
      };
    default:
      return state;
  }
}
