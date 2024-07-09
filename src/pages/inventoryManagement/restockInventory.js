import React, { useState } from "react";

function RestockPopup({ product, currentStock, price, onRestock, onClose }) {
    const [restockAmount, setRestockAmount] = useState("");

    const handleRestock = () => {
        const restockValue = parseInt(restockAmount);
        if (isNaN(restockValue) || restockValue <= 0) {
            alert("Please enter a valid restock quantity.");
            return;
        }
        onRestock(product, restockValue);
        onClose();
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
                            <h4 className=" text-blue mb-6 mt-10 ml-48  text-2xl font-medium leading-tight">
                                Restock
                            </h4>
                            <div className="relative mb-3" data-twe-input-wrapper-init>
                                <input value={product} readOnly className="input input-bordered w-full bg-teal-200 " />
                            </div>
                            <div className="relative mb-3" data-twe-input-wrapper-init>
                                <input value={price} readOnly className="input input-bordered w-full bg-teal-200 " />
                            </div>
                            <div className="relative mb-3" data-twe-input-wrapper-init>
                                <input value={currentStock} readOnly className="input input-bordered w-full bg-teal-200 " />
                            </div>
                            <div className="relative mb-3" data-twe-input-wrapper-init>
                                <input type="number" placeholder="Restock amount" value={restockAmount} onChange={(e) => setRestockAmount(e.target.value)} required className="input input-bordered w-full bg-teal-200 " />
                            </div>
                            <br />
                            <button
                                type="button"
                                onClick={handleRestock}
                                data-twe-ripple-init
                                data-twe-ripple-color="light"
                                className="ml-40 bg-green-500 mr-2 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                Restock
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
                </div></div></div>
    );
}

export default RestockPopup;
