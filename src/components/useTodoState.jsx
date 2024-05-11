import React, { useState } from "react";
import useLocalStorage from "./localStorage.ts";
import { Error } from "./Error.jsx";

const useTodoState = () => {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [NumberofStock, setNumberofStock] = useLocalStorage(
    "numberofstock",
    []
  );
  const [price, setPrice] = useLocalStorage("Price", []);
  const [newTodo, setNewTodo] = useState("");
  const [newNumberOfStock, setNewNumberOfStock] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [error, setError] = useState("");

  const addTodo = () => {
    if (!newTodo || !newNumberOfStock || !newPrice) {
      setError("Please input all fields");
      return;
    }
    if (isNaN(newNumberOfStock) || isNaN(newPrice)) {
      setError("Please enter valid numbers for stock and price");
      return;
    }
    if (
      newTodo.trim() !== "" &&
      newNumberOfStock.trim() !== "" &&
      newPrice.trim() !== ""
    ) {
      if (todos.find((todo) => todo.text === newTodo)) {
      }

      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo("");

      setNumberofStock([
        ...NumberofStock,
        { id: Date.now(), text: newNumberOfStock },
      ]);
      setNewNumberOfStock("");

      setPrice([...price, { id: Date.now(), text: newPrice }]);
      setNewPrice("");
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    setTodos,
    NumberofStock,
    setNumberofStock,
    price,
    setPrice,
    newTodo,
    setNewTodo,
    newNumberOfStock,
    setNewNumberOfStock,
    newPrice,
    setNewPrice,
    addTodo,
    removeTodo,
  };
};

export default useTodoState;
