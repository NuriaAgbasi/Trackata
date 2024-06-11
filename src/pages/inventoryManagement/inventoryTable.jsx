import React, { useState, useEffect } from "react";
import EditInventory from "./EditInventory.jsx";
import DeleteInventory from "./deleteInventory.js";
import RestockPopup from "./restockInventory";
import Info from "./info.tsx";
import Alert from "../../components/Alert.tsx";
import { FaArrowUp, FaInfoCircle } from "react-icons/fa";
import { countContext } from "../../components/context.js";

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

  const [popupType, setPopupType] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const [editedIndex, setEditedIndex] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [changeHistory, setChangeHistory] = useState({});

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
      setPopupType("edit");
      setPopupData({
        editedStock: items[index].stock,
        editedPrice: items[index].price,
        editedCost: items[index].costPrice,
      });
    } else {
      console.error(`Invalid index ${index} provided for editing stock.`);
    }
  };

  const handleSaveEdit = (newStock, newPrice, newCost) => {
    if (
      editedIndex !== null &&
      editedIndex >= 0 &&
      editedIndex < items.length
    ) {
      if (newCost > newPrice) {
        setAlertMessage("Error,Cost price cannot be higher than sale price.");
        setAlertType("red");
        return;
      }

      const updatedItems = [...items];
      const oldItem = updatedItems[editedIndex];
      const newItem = {
        ...oldItem,
        stock: newStock,
        price: newPrice,
        costPrice: newCost,
        profit: newPrice - newCost,
      };

      updatedItems[editedIndex] = newItem;
      setItems(updatedItems);

      const now = new Date().toLocaleString();
      const history = changeHistory[oldItem.name] || [];
      history.push({
        date: now,
        changes: {
          stock: [oldItem.stock, newStock],
          price: [oldItem.price, newPrice],
          costPrice: [oldItem.costPrice, newCost],
        },
      });
      setChangeHistory({
        ...changeHistory,
        [oldItem.name]: history,
      });

      setAlertMessage(`Successfully updated ${newItem.name}.`);
      setAlertType("green");

      closePopup();
    } else {
      console.error(`Invalid index ${editedIndex} provided for saving edit.`);
    }
  };

  const handleRestock = (product, restockAmount) => {
    const updatedItems = [...items];
    updatedItems[editedIndex].stock += restockAmount;
    setItems(updatedItems);
    setAlertMessage(
      `Successfully restocked ${product} by ${restockAmount} units.`
    );
    setAlertType("green");
    setPopupType(null);
  };

  const openPopup = (type, data) => {
    setPopupType(type);
    setPopupData(data);
  };

  const closePopup = () => {
    setPopupType(null);
  };

  return (
    <countContext.Provider
      value={{
        editedStock: popupData?.editedStock || "",
        editedPrice: popupData?.editedPrice || "",
        editedCost: popupData?.editedCost || "",
        closePopup,
        handleSaveEdit: handleSaveEdit,
      }}
    >
      <div className="h-full w-full overflow-scroll">
        <Alert message={alertMessage} type={alertType} />
        {popupType === "edit" && <EditInventory />}
        {confirmDelete && (
          <DeleteInventory
            handleActionConfirmation={confirmRemoveStock}
            onCancel={cancelRemoveStock}
          />
        )}

        {popupType === "restock" && (
          <RestockPopup
            product={items[editedIndex].name}
            currentStock={items[editedIndex].stock}
            price={items[editedIndex].price}
            onRestock={handleRestock}
            onClose={closePopup}
          />
        )}
        {popupType === "info" && (
          <Info
            title="Change History"
            content={changeHistory[items[editedIndex]?.name] || []}
            onClose={closePopup}
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
            {items &&
              items.map((item, index) => (
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
                      <span className="flex">
                        {item.profit}
                        <FaArrowUp />
                      </span>
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
                      onClick={() => openPopup("restock", index)}
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Restock
                    </button>
                    <button
                      onClick={() => openPopup("info", index)}
                      className="text-white px-4 py-2 rounded"
                    >
                      <p className="flex text-black">
                        <FaInfoCircle />
                      </p>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </countContext.Provider>
  );
}

export default InventoryTable;
