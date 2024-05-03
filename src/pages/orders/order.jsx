import React from "react";
import TodoListState from "../../components/todoListState.jsx";
import { Typography } from "@material-tailwind/react";
import SalesPopup from "../../components/salesPopup.jsx";
import EditPopup from "../../components/editPopup.jsx";
import Background from "../../components/background.jsx";
const Orders = ({ todos, removeTodo, NumberofStock, Price, salesLog }) => {
  return (
    <Background>
      <TodoListState
        todos={todos}
        removeTodo={removeTodo}
        NumberofStock={NumberofStock}
        Price={Price}
      >
        {({
          editPopup,
          editedName,
          editedPrice,
          editedStock,
          restockAmount,
          salesPopup,
          openEditPopup,
          handleRestock,
          openSoldPopup,
          handleSales,
          closeEditPopup,
          closeSalesPopup,
          setRestockAmount,
          setEditedPrice,
          setEditedStock,
        }) => (
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
                        {NumberofStock.find((stock) => stock.id === todo.id)
                          ?.text || ""}
                      </span>
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="mb-2 ml-5 mt-2"
                      variant="h5"
                    >
                      <p className="mb-3">Price</p>
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
              <EditPopup
                editedName={editedName}
                editedStock={editedStock}
                editedPrice={editedPrice}
                restockAmount={restockAmount}
                closeEditPopup={closeEditPopup}
                handleRestock={handleRestock}
                setEditedStock={setEditedStock}
                setEditedPrice={setEditedPrice}
                setRestockAmount={setRestockAmount}
              />
            )}
            {salesPopup && (
              <SalesPopup
                itemName={editedName}
                currentStock={editedStock}
                handleSales={handleSales}
                closeSalesPopup={closeSalesPopup}
              />
            )}
          </div>
        )}
      </TodoListState>
    </Background>
  );
};

export default Orders;
