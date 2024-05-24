import React, { useState } from "react";

const InventoryInfo = ({ onClose }) => {
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
                                Information
                            </h4>
                            <p>Information content</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryInfo;
