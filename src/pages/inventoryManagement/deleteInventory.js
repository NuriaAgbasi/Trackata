import React from "react";

const DeleteInventory = ({ onConfirm, onCancel }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-full px-4">
        <div className=" grid h-screen place-items-center">
          <div className="max-w-xl w-full">

            <div className="bg-white p-10 rounded-md shadow-md">
              <button
                type="button"
                onClick={onCancel}
                data-twe-ripple-init
                data-twe-ripple-color="light"
                className=" bg-red-600 close inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                &times;
              </button>
              <h5 className="mb-6 text-blue-gray mt-10 ml-4 text-xl font-medium leading-tight text-primary">
                Are you sure you want to delete this inventory?
              </h5>
              <br />
              <h6 className="italic mb-2 text-blue-gray mt-0 text-base font-medium leading-tight text-primary">
                Please be aware that deleting this inventory is irreversible and will result in the permanent removal of all your data.
              </h6>
              <br />
              <div className="flex">
                <button
                  type="button"
                  onClick={onConfirm}
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                  className="ml-40 bg-red-800 mr-2 inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                  Delete
                </button>
                <button
                  type="button"
                  onClick={onCancel}
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

export default DeleteInventory;
