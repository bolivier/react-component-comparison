import React, { useState } from "react";
import { initialState } from "./initialState";

export function DirectFn() {
  const [todos, setTodos] = useState(initialState);
  const [newInputVal, setNewInputVal] = useState("");

  const onChangeNewInputVal = e => {
    e.preventDefault();
    setNewInputVal(e.target.value);
  };

  const addNewTodo = e => {
    e.preventDefault();
    const newTodos = [...todos, { label: newInputVal }];
    setTodos(newTodos);
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
          onChange={onChangeNewInputVal}
        />
        <button onClick={addNewTodo}>add todo</button>
      </div>
    </div>
  );
}
