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
    setNewInputVal("");
  };

  const removeTodo = id => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div>
      <ul>
        {todos.map(({ label, id }) => (
          <li onClick={() => removeTodo(id)} key={id}>
            {label}
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
