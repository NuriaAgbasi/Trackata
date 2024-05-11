import React, { useState } from "react";

const EditInventory = ({ editedStock, editedPrice, onSave, onClose }) => {
    const [newStock, setNewStock] = useState(editedStock);
    const [newPrice, setNewPrice] = useState(editedPrice);

    const handleStockChange = (e) => {
        setNewStock(parseInt(e.target.value));
    };

    const handlePriceChange = (e) => {
        setNewPrice(parseFloat(e.target.value));
    };

    const handleSave = () => {
        onSave(newStock, newPrice);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="w-full px-4">
                <div className="grid h-screen place-items-center">
                    <div className="max-w-xl w-full">
                        <body>
                            <button
                                type="button"
                                data-twe-ripple-init
                                data-twe-ripple-color="light"
                                onClick={onClose}
                                class=" bg-red-600 close inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                &times;
                            </button>
                            <span class="text-blue-gray text-xl mt-10 ml-56 mb-6">
                                Edit
                            </span>

                            <div>
                                <div class="relative mb-3" data-twe-input-wrapper-init>
                                    <input
                                        type="number"
                                        class="peer block min-h-[auto] w-full rounded border-0 bg-neutral-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:bg-neutral-600 dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                        id="stock"
                                        value={newStock}
                                        aria-label="readonly input example"
                                        readonly
                                        onChange={handleStockChange} />
                                    <label
                                        for="stock"
                                        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                    >Name
                                    </label>
                                </div>
                            </div>
                            <br />
                            <div>
                                <div class="relative mb-3" data-twe-input-wrapper-init>
                                    <input
                                        type="number"
                                        class="peer block min-h-[auto] w-full rounded border-0 bg-neutral-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:bg-neutral-600 dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                        id="price"
                                        value={newPrice}
                                        onChange={handlePriceChange}
                                        aria-label="readonly input example" />
                                    <label
                                        for="price"
                                        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                    >Price
                                    </label>
                                </div>
                            </div>
                            <br />
                            <div className="flex">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    data-twe-ripple-init
                                    data-twe-ripple-color="light"
                                    class="ml-40 bg-green-500 mr-2 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    data-twe-ripple-init
                                    data-twe-ripple-color="light"
                                    class=" bg-orange-400 ml-2 inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                    Cancel
                                </button>
                            </div>
                        </body>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditInventory;
