import React, { useState } from "react";
import ReusableLink from "../../reusablecomponents/rusablelink";
import "../../styling/AddStock.css";
import Counter from "./Counter/counter1";

const AddStock = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo("");
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <ReusableLink>
      <div className="todo-list-container">
        <h1 className="todo-list-title">Add Stock</h1>
        <div className="todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add Stock"
            className="todo-input"
          />
          <button onClick={addTodo} className="add-button">
            Add
          </button>
        </div>
        <ul style={{ listStyle: "none", padding: "0" }}>
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span className="todo-text">{todo.text}</span>
              <span className="counter-span">
                <Counter />
              </span>
              <span className="span-removebutton">
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="remove-button"
                >
                  Stock finished
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ReusableLink>
  );
};

export default AddStock;
