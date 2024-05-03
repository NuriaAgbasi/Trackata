// Inventory page
// Table for inventory management Header (Item Id, Item dec, Quantity, Price (Total of items), Data of purchase, Data updated, Last restocked date, Last sold)

import Background from "../../components/background";
import AddStockPopup from "../addStock/addStockPopup";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { Table } from "./table";
import useTodoState from "../../components/useTodoState";
// Button for adding new item, Button for deleting item, Button for updating item
const Inventory = () => {
  const [addStockpop, setAddStockPopup] = useState(false);
  const { todos, NumberofStock, price, removeTodo } = useTodoState();
  const handleClosePopup = () => {
    setAddStockPopup(false);
  };
  return (
    <Background>
      <div className="flex justify-between items-center gap-4 pt-5">
        <h1 className=" font-extrabold text-4xl ">Inventory</h1>
        <Button onClick={() => setAddStockPopup(true)}>Add Stock</Button>
      </div>
      <Table
        todos={todos}
        removeTodo={removeTodo}
        NumberofStock={NumberofStock}
        Price={price}
      />

      {addStockpop && (
        <AddStockPopup
          trigger={addStockpop}
          setTrigger={setAddStockPopup}
          handleClose={handleClosePopup}
        />
      )}
    </Background>
  );
};

export default Inventory;
