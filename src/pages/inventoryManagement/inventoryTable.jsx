import React, { useState, useEffect } from "react";
import EditInventory from "./editInvtory.js";
import DeleteInventory from "./deleteInventory.js";
import RestockPopup from "./restockInventory";
import Alert from "../../components/alert";
import { FaArrowUp } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";

const TABLE_HEAD = [
  "Name",
  "Number of Stock",
  "Sale Price",
  "Cost Price",
  "Profit",
  "Created Date",
  "Actions",
];

function InventoryTable({ items, setItems, onRemoveStock }) {
  useEffect(() => {}, [items]);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showRestockPopup, setShowRestockPopup] = useState(false);
  const [restockItemIndex, setRestockItemIndex] = useState(null);
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedStock, setEditedStock] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleRemoveStock = (index) => {
    setConfirmDelete(true);
    setEditedIndex(index);
  };

  const confirmRemoveStock = () => {
    onRemoveStock(editedIndex);
    setConfirmDelete(false);
    setAlertMessage("Item has been deleted!");
    setAlertType("red");
  };

  const cancelRemoveStock = () => {
    setConfirmDelete(false);
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

      setAlertMessage(
        `Successfully updated ${updatedItems[editedIndex].name}.`
      );
      setAlertType("green");

      closeEditPopup();
    } else {
      console.error(`Invalid index ${editedIndex} provided for saving edit.`);
    }
  };

  const handleRestock = (product, restockAmount) => {
    const updatedItems = [...items];
    updatedItems[restockItemIndex].stock += restockAmount;
    setItems(updatedItems);
    setAlertMessage(
      `Successfully restocked ${product} by ${restockAmount} units.`
    );
    setAlertType("green");

    setShowRestockPopup(false);
  };

  const openRestockPopup = (index) => {
    setRestockItemIndex(index);
    setShowRestockPopup(true);
  };

  const closeRestockPopup = () => {
    setShowRestockPopup(false);
  };

  return (
    <div className="h-full w-full overflow-scroll">
      <Alert message={alertMessage} type={alertType} />
      {showEditPopup && (
        <EditInventory
          editedStock={editedStock}
          editedPrice={editedPrice}
          onSave={handleSaveEdit}
          onClose={closeEditPopup}
        />
      )}
      {confirmDelete && (
        <DeleteInventory
          onConfirm={confirmRemoveStock}
          onCancel={cancelRemoveStock}
        />
      )}
      {showRestockPopup && (
        <RestockPopup
          product={items[restockItemIndex].name}
          currentStock={items[restockItemIndex].stock}
          price={items[restockItemIndex].price}
          onRestock={handleRestock}
          onClose={closeRestockPopup}
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
                <p className="text-blue-gray text-sm font-normal leading-none">
                  {head}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map(
            (item, index) => (
              console.log("Item createdAt:", item.createdAt),
              (
                <tr key={index} className="bg-white">
                  <td className="p-4">
                    <p className="text-blue-gray text-sm font-normal">
                      {item.name}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-blue-gray text-sm font-normal">
                      {item.stock}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-blue-gray text-sm font-normal">
                      {item.price}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-blue-gray text-sm font-normal">
                      {item.costPrice}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-green-700 text-sm font-normal">
                      <div className="flex">
                        {item.profit}
                        <FaArrowUp />
                      </div>
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-blue-gray text-sm font-normal">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleRemoveStock(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Remove Stock
                    </button>
                    <button
                      onClick={() => handleEditStock(index)}
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Edit Stock Price
                    </button>
                    <button
                      onClick={() => openRestockPopup(index)}
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Restock
                    </button>
                    <button className="text-white px-4 py-2 rounded">
                      <p className="flex text-black">
                        <FaInfoCircle />
                      </p>
                    </button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;
