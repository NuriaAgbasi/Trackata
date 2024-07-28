import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import EditInventory from "./EditInventory.jsx";
import DeleteInventory from "./deleteInventory.js";
import RestockPopup from "./restockInventory";
import Info from "./info.tsx";
import Alert from "../../components/Alert.tsx";
import {
  FaArrowUp,
  FaInfoCircle,
  FaTrash,
  FaEdit,
  FaPlus,
} from "react-icons/fa";
import DeletedInventoryPopup from "./DeleteInventoryPopup";

const TABLE_HEAD = [
  "Name",
  "Number of Stock",
  "Sale Price",
  "Cost Price",
  "Profit",
  "Created Date",
  "Actions",
];

function InventoryTable() {
  const [items, setItems] = useState([]);
  const [popupType, setPopupType] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const [editedIndex, setEditedIndex] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [changeHistory, setChangeHistory] = useState({});
  const [deletedInventory, setDeletedInventory] = useState([]);
  const [showDeletedPopup, setShowDeletedPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from("inventory").select("*");
      if (error) {
        console.error("Error fetching items:", error);
      } else {
        setItems(data);
      }
    };

    fetchItems();

    const inventoryChannel = supabase
      .channel("inventory_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "inventory" },
        (payload) => {
          console.log("Change received!", payload);
          fetchItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(inventoryChannel);
    };
  }, []);

  const handleRemoveStock = (index) => {
    setConfirmDelete(true);
    setEditedIndex(index);
  };

  const confirmRemoveStock = async () => {
    const itemToDelete = items[editedIndex];
    const { data: insertData, error: insertError } = await supabase
      .from("deleted_inventory")
      .insert([
        {
          id: itemToDelete.id,
          name: itemToDelete.name,
          stock: itemToDelete.stock,
          price: itemToDelete.sales_price,
          cost_price: itemToDelete.cost_price,
          created_at: itemToDelete.created_at,
        },
      ]);

    if (insertError) {
      console.error("Error inserting deleted item:", insertError.message);
    } else {
      const { data: deleteData, error: deleteError } = await supabase
        .from("inventory")
        .delete()
        .eq("id", itemToDelete.id);

      if (deleteError) {
        console.error("Error deleting item:", deleteError.message);
      } else {
        const updatedItems = items.filter((_, index) => index !== editedIndex);
        setItems(updatedItems);
        setDeletedInventory([...deletedInventory, itemToDelete]);
        setAlertMessage("Item has been deleted!");
        setAlertType("red");
        setConfirmDelete(false);
      }
    }
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

  const handleSaveEdit = async (newStock, newPrice, newCost) => {
    if (
      editedIndex !== null &&
      editedIndex >= 0 &&
      editedIndex < items.length
    ) {
      if (newCost > newPrice) {
        setAlertMessage("Error, Cost price cannot be higher than sale price.");
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

      const { error } = await supabase
        .from("inventory")
        .update({
          stock: newStock,
          price: newPrice,
          costPrice: newCost,
          profit: newPrice - newCost,
        })
        .eq("id", oldItem.id);

      if (error) {
        console.error("Error updating item:", error);
      } else {
        setAlertMessage(`Successfully updated ${newItem.name}.`);
        setAlertType("green");
      }

      closePopup();
    } else {
      console.error(`Invalid index ${editedIndex} provided for saving edit.`);
    }
  };

  const handleRestock = async (product, restockAmount) => {
    const updatedItems = [...items];
    updatedItems[editedIndex].stock += restockAmount;
    setItems(updatedItems);
    setAlertMessage(
      `Successfully restocked ${product} by ${restockAmount} units.`
    );
    setAlertType("green");
    setPopupType(null);

    const { error } = await supabase
      .from("inventory")
      .update({ stock: updatedItems[editedIndex].stock })
      .eq("id", updatedItems[editedIndex].id);

    if (error) {
      console.error("Error updating stock:", error);
    }
  };

  const openPopup = (type, index) => {
    setEditedIndex(index);
    setPopupType(type);
    setPopupData(items[index]);
  };

  const closePopup = () => {
    setPopupType(null);
    console.log("Close button clicked");
  };

  return (
    <div className="h-full w-fit overflow-scroll">
      {popupType === "edit" && <EditInventory onClose={closePopup} />}
      <Alert message={alertMessage} type={alertType} />
      {confirmDelete && (
        <DeleteInventory
          handleActionConfirmation={confirmRemoveStock}
          onCancel={cancelRemoveStock}
        />
      )}
      {popupType === "restock" &&
        editedIndex !== null &&
        items[editedIndex] && (
          <RestockPopup
            product={items[editedIndex].name}
            currentStock={items[editedIndex].stock}
            price={items[editedIndex].price}
            onRestock={handleRestock}
            onClose={closePopup}
          />
        )}
      {popupType === "info" && editedIndex !== null && items[editedIndex] && (
        <Info
          title="Change History"
          content={changeHistory[items[editedIndex]?.name] || []}
          onClose={closePopup}
        />
      )}
      <button
        onClick={() => setShowDeletedPopup(true)}
        className="bg-teal-300 text-white px-4 py-2 rounded mb-4"
      >
        Show Deleted Inventory
      </button>
      {showDeletedPopup && (
        <DeletedInventoryPopup
          deletedInventory={deletedInventory}
          onClose={() => setShowDeletedPopup(false)}
        />
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
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
                      {item.sales_price}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-blue-gray text-sm font-normal">
                      {item.cost_price}
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
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </td>
                  <td className="p-4 actions flex space-x-2">
                    <button
                      onClick={() => handleRemoveStock(index)}
                      className=""
                    >
                      <span className="material-icons">delete</span>
                    </button>
                    {/* <Link to={/inventoryManagement/edit/${item.id}}>*/}
                    <button onClick={() => openPopup("edit", index)}>
                      <i className="material-icons">edit</i>
                    </button>

                    <button
                      onClick={() => openPopup("restock", index)}
                      className=""
                    >
                      <span className="material-icons">add</span>
                    </button>
                    <button
                      onClick={() => openPopup("info", index)}
                      className=""
                    >
                      <span className="material-icons">info</span>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryTable;
