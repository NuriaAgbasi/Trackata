import React, { useState } from "react";
import ReusableLink from "../../components/rusablelink.jsx";
import AddStockPopup from "./addStockPopup.jsx";
import useTodoState from "../../components/useTodoState.jsx";
import TodoList from "./todoList.jsx";
import Footer from "../home/footer.jsx";
const AddStock = () => {
  const [addStockpop, setAddStockPopup] = useState(false);
  const { todos, NumberofStock, price, removeTodo } = useTodoState();

  const handleClosePopup = () => {
    setAddStockPopup(false);
  };

  return (
    <ReusableLink>
      <div id="bgcol" className="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div className="m-0 p-0 box-border font-sans">
          <div className="p-8 flex flex-col items-center justify-center min-h-screen">
            <button
              className="bg-[#4caf50] hover:bg-[#6fb171] text-black font-bold py-5 px-11 rounded-full mb-4 relative z-2"
              onClick={() => setAddStockPopup(true)}
            >
              Add Stock
            </button>
            <TodoList
              todos={todos}
              removeTodo={removeTodo}
              NumberofStock={NumberofStock}
              Price={price}
            />
          </div>
          <Footer />
        </div>
        {addStockpop && (
          <AddStockPopup
            trigger={addStockpop}
            setTrigger={setAddStockPopup}
            handleClose={handleClosePopup}
          />
        )}
      </div>
    </ReusableLink>
  );
};

export default AddStock;
