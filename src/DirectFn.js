import React, { useState } from "react";
import { initialState } from "./initialState";

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
  const [todos, setTodos] = useState(initialState);
  const [newInputVal, setNewInputVal] = useState("");

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
