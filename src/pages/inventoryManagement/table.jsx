import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import TodoListState from "../../components/todoListState";
import SalesPopup from "../../components/salesPopup.jsx";
import EditPopup from "../../components/editPopup.jsx";
import Background from "../../components/background.jsx";
import { FaPen } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { MdDelete } from "react-icons/md";

export function Table({ todos, removeTodo, NumberofStock, Price, salesLog }) {
  console.log("Price prop received in Table component:", Price);

  const stockMap = {};
  NumberofStock.forEach((stock) => (stockMap[stock.id] = stock.text));
  console.log("Stock Map:", stockMap);

  const priceMap = {};
  Price.forEach((price) => (priceMap[price.id] = price.text));
  console.log("Price Map:", priceMap);
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
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Name
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      NŌ of Stock
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Price
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Actions
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo) => (
                  <tr key={todo.id}>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {todo.text}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {stockMap[todo.id] || ""}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {priceMap[todo.id] || ""}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => removeTodo(todo.id)}
                        className="bg-red-500 text-white border-none p-2 cursor-pointer"
                      >
                        <MdDelete />
                      </button>
                      <button
                        onClick={() => openEditPopup(todo)}
                        className=" bg-orange-300 ml-3 text-white border-none p-2 cursor-pointer"
                      >
                        <RxUpdate />
                      </button>
                      <button
                        onClick={() => openSoldPopup(todo)}
                        className="bg-green-400 ml-3 text-white border-none p-2 cursor-pointer"
                      >
                        <FaPen />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          </Card>
        )}
      </TodoListState>
    </Background>
  );
}
