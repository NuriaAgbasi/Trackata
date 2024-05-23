import React from "react";
import ReusableLink from "../../components/rusablelink";
import { Input, IconButton } from "@material-tailwind/react";
import useTodoState from "../../components/useTodoState";

const AddStockPopup = (props) => {
  const {
    newTodo,
    setNewTodo,
    newNumberOfStock,
    setNewNumberOfStock,
    newPrice,
    setNewPrice,
    addTodo,
    error,
  } = useTodoState();

  const handleClose = () => {
    if (
      newTodo.trim() !== "" &&
      newNumberOfStock.trim() !== "" &&
      newPrice.trim() !== ""
    ) {
      props.setTrigger(false);
    }
  };
  const Close = () => {
    props.setTrigger(false);
  };

  return props.trigger ? (
    <ReusableLink>
      <div className="fixed inset-0 flex items-center justify-center  ">
        <div className=" bg-[#5063bf] px-52 py-9 mx-auto my-auto shadow-2xl">
          <div className="flex mb-10 mt-5 gap-6 flex-col">
            <div className="flex w-full justify-end">
              <IconButton variant="text" onClick={Close}>
                <i className="fas fa-close text-xl">
                  <div className="box">
                    <svg width="40" height="40" viewbox="0 0 40 40">
                      <path
                        d="M 10,10 L 30,30 M 30,10 L 10,30"
                        stroke="black"
                        strokeWidth="4"
                      />
                    </svg>
                  </div>
                </i>
              </IconButton>
            </div>
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              label="Name of Stock"
              className="flex-1 p-2 border border-gray-300"
            />
            <Input
              type="number"
              label="Number of stock"
              value={newNumberOfStock}
              onChange={(e) => setNewNumberOfStock(e.target.value)}
              className="flex-1 p-2 border border-gray-300"
            />
            <Input
              type="number"
              label="Price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="flex-1 p-2 border border-gray-300"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={() => {
                addTodo();
                handleClose();
              }}
              className="ml-2 p-2 bg-green-500 text-white border-none"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </ReusableLink>
  ) : (
    ""
  );
};

export default AddStockPopup;
