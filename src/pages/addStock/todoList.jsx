import React, { useState } from "react";
import useTodoState from "../../components/useTodoState";
import {
  Button,
  Card,
  CardBody,
  IconButton,
  Typography,
  Input,
} from "@material-tailwind/react";
import Contact from "../Contact";
const TodoList = ({ todos, removeTodo, NumberofStock, Price }) => {
  const { setPrice, setTodos, setNumberofStock } = useTodoState();
  const [editPopup, setEditPopup] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedStock, setEditedStock] = useState("");

  const openEditPopup = (todo) => {
    const stockItem = NumberofStock.find((stock) => stock.id === todo.id);
    const PriceofItem = Price.find((stock) => stock.id === todo.id);
    setEditedName(todo.text);
    setEditedPrice(PriceofItem ? PriceofItem.text : "");
    setEditedStock(stockItem ? stockItem.text : "");
    setEditPopup(todo.id);
  };

  const openSoldPopup = (todo) => {
    <Contact />;
  };

  const closeEditPopup = () => {
    setEditPopup(null);
  };

  const saveChanges = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      const updatedTodos = [...todos];
      updatedTodos[index].text = editedName;
      const stockIndex = NumberofStock.findIndex((stock) => stock.id === id);
      if (stockIndex !== -1) {
        NumberofStock[stockIndex].text = editedStock;
      }
      const priceIndex = Price.findIndex((stock) => stock.id === id);
      if (priceIndex !== -1) {
        Price[priceIndex].text = editedPrice;
      }
      setTodos(updatedTodos);
      setNumberofStock([...NumberofStock]);
      setPrice([...Price]);
      closeEditPopup();
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {todos.map((todo) => {
          return (
            <li
              key={todo.id}
              className="mb-2 m-4 p-2 border border-gray-300 rounded flex justify-between items-center bg-gray-100 w-screen"
            >
              <Typography
                color="blue-gray"
                className="mb-2 ml-5 mt-2"
                variant="h5"
              >
                <p className="mb-3">Name</p>
                <span className=" text-center">{todo.text}</span>
              </Typography>
              <Typography
                color="blue-gray"
                className="mb-2 ml-5 mt-2"
                variant="h5"
              >
                <p className="mb-3">NŌ of Stock</p>
                <span className="text-center">
                  {NumberofStock.find((stock) => stock.id === todo.id)?.text ||
                    ""}
                </span>
              </Typography>
              <Typography
                color="blue-gray"
                className="mb-2 ml-5 mt-2"
                variant="h5"
              >
                <p className="mb-3">Price</p>N
                {Price.find((stock) => stock.id === todo.id)?.text || ""}
              </Typography>
              <span>
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="bg-red-500 text-white border-none p-2 cursor-pointer"
                >
                  Stock finished
                </button>
                <button
                  onClick={() => openEditPopup(todo)}
                  className=" bg-orange-300 ml-3 text-white border-none p-2 cursor-pointer"
                >
                  Restock
                </button>
                <button
                  onClick={() => openSoldPopup(todo)}
                  className="bg-green-400 ml-3 text-white border-none p-2 cursor-pointer"
                >
                  Sales
                </button>
              </span>
            </li>
          );
        })}
      </ul>
      {editPopup && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="w-full px-4">
            <div className="grid h-screen place-items-center">
              <Card className="max-w-xl w-full">
                <CardBody>
                  <span className="close" onClick={closeEditPopup}>
                    &times;
                  </span>
                  <Typography
                    color="blue-gray"
                    className="mb-6 mt-10"
                    variant="h4"
                  >
                    Edit Item
                  </Typography>
                  <Input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    label="Stock Name"
                    className=""
                  />
                  <br />
                  <Input
                    type="text"
                    value={editedStock}
                    onChange={(e) => setEditedStock(e.target.value)}
                    label="Stock"
                  />
                  <br />
                  <Input
                    type="text"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
                    label="Price"
                  />

                  <Button
                    className="m-5 ml-60"
                    onClick={() => saveChanges(editPopup)}
                  >
                    Save
                  </Button>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
