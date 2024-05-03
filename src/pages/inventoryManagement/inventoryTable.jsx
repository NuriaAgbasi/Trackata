import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import EditInventory from "./editInvtory";

const TABLE_HEAD = ["Name", "Number of Stock", "Price", "Actions"];

function InventoryTable({ items, setItems, onRemoveStock }) {
  useEffect(() => {}, [items]);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedStock, setEditedStock] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  const handleRemoveStock = (index) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (shouldDelete) {
      onRemoveStock(index);
    }
  };

  const handleEditStock = (index) => {
    if (index >= 0 && index < items.length) {
      setEditedIndex(index);
      setEditedStock(items[index].stock);
      setEditedPrice(items[index].price);
      setShowEditPopup(true);
    } else {
      console.error(`Invalid index ${index} provided for editing stock.`);
    }
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
  };

  const handleSaveEdit = (newStock, newPrice) => {
    if (
      editedIndex !== null &&
      editedIndex >= 0 &&
      editedIndex < items.length
    ) {
      const updatedItems = [...items];

      updatedItems[editedIndex] = {
        ...updatedItems[editedIndex],
        stock: newStock,
        price: newPrice,
      };

      setItems(updatedItems);

      closeEditPopup();
    } else {
      console.error(`Invalid index ${editedIndex} provided for saving edit.`);
    }
  };

  return (
    <Card className="h-full w-full overflow-scroll">
      {showEditPopup && (
        <EditInventory
          editedStock={editedStock}
          editedPrice={editedPrice}
          onSave={handleSaveEdit}
          onClose={closeEditPopup}
        />
      )}
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.stock}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.price}
                </Typography>
              </td>
              <td>
                <button
                  onClick={() => handleRemoveStock(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                >
                  Remove Stock
                </button>
                <button
                  onClick={() => handleEditStock(index)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Edit Stock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default InventoryTable;
