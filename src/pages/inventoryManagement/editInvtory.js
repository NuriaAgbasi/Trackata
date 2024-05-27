import React, { useState } from "react";

const EditInventory = ({ editedStock, editedPrice, editedCost, onSave, onClose }) => {
    const [newStock, setNewStock] = useState(editedStock);
    const [newPrice, setNewPrice] = useState(editedPrice);
    const [newCost, setNewCost] = useState(editedCost);

    const handleStockChange = (e) => {
        setNewStock(parseInt(e.target.value));
    };

    const handlePriceChange = (e) => {
        setNewPrice(parseFloat(e.target.value));
    };

    const handleCostChange = (e) => {
        setNewCost(parseFloat(e.target.value));
    };

    const handleSave = () => {
        onSave(newStock, newPrice, newCost);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="w-full px-4">
                <div className=" grid h-screen place-items-center">
                    <div className="max-w-xl w-full">
                        <div className="bg-white p-10 rounded-md shadow-md">
                            <button
                                type="button"
                                onClick={onClose}
                                data-twe-ripple-init
                                data-twe-ripple-color="light"
                                className=" bg-red-600 close inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                &times;
                            </button>
                            <h4 className=" text-blue mb-6 mt-10 ml-40  text-2xl font-medium leading-tight">
                                Edit
                            </h4>
                            <div className="relative mb-3" data-twe-input-wrapper-init>
                                <input type="number" value={newStock} onChange={handleStockChange} className="input input-bordered w-full bg-blue " />
                            </div>
                            <br />
                            <div className="relative mb-3" data-twe-input-wrapper-init>
                                <input type="number" value={newPrice} onChange={handlePriceChange} placeholder="Edit Price" className="input input-bordered w-full bg-blue" />
                            </div>
                            <br />
                            <div className="relative mb-3" data-twe-input-wrapper-init>
                                <input type="number" value={newCost} onChange={handleCostChange} placeholder="Edit Cost" className="input input-bordered w-full bg-blue" />
                            </div>
                            <br />
                            <div className="flex">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    data-twe-ripple-init
                                    data-twe-ripple-color="light"
                                    className="ml-40 bg-green-500 mr-2 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    data-twe-ripple-init
                                    data-twe-ripple-color="light"
                                    className=" bg-orange-400 ml-2 inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditInventory;
