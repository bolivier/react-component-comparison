import React, { useState, useReducer, useEffect } from "react";
import { initialState as initialTodos, getInitialState } from "./initialState";

const initialState = {
  todos: [],
  inputVal: "",
  nextId: 3
};

export function IdiomaticFn() {
  const [{ todos, inputVal }, dispatch] = useTodos();

  return (
    <div>
      <ul>
        {todos.map(({ label, id, completed }) => (
          <li
            onClick={() =>
              dispatch({ type: "todo/toggle-completed", payload: id })
            }
            key={id}
          >
            style={{ textDecoration: completed ? "line-through" : "none" }}
            >
              {label}
            </span>
            <button
              data-testid={id}
              onClick={neutralizeEvent(() => {
                dispatch({ type: "todo/remove", payload: id });
              })}
            >
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
          value={inputVal}
          onChange={e =>
            dispatch({ type: "input-change", payload: e.target.value })
          }
        />
        <button
          onClick={() =>
            dispatch({
              type: "todo/add",
              payload: inputVal
            })
          }
        >
          add todo
        </button>
      </div>
    </div>
  );
}

function todoReducer(state, { type, payload }) {
  const { todos, inputVal, nextId } = state;

  switch (type) {
    case "todo/add":
      return {
        ...state,
        todos: [...todos, { label: payload, id: nextId }],
        inputVal: "",
        nextId: nextId + 1
      };
    case "todo/set":
      return {
        ...state,
        todos: payload
      };
    case "todo/remove":
      return { ...state, todos: todos.filter(todo => todo.id !== payload) };
    case "input-change":
      return {
        ...state,
        inputVal: payload
      };
    case "todo/toggle-completed":
      return {
        ...state,
        todos: todos.map(todo =>
          todo.id === payload ? { ...todo, completed: !todo.completed } : todo
        )
      };
    default:
      return state;
  }
}

function useTodos() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    getInitialState().then(todos => {
      dispatch({
        type: "todo/set",
        payload: todos
      });
    });
  }, []);

  return [state, dispatch];
}

const neutralizeEvent = f => {
    return e => {
      e.preventDefault();
      e.stopPropagation();
      f();
    };
  };