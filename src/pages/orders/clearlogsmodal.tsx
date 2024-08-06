import React, { useState } from "react";

interface ClearLogsModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handleClearLogs: (clearByDate: string, clearPassword: string) => void;
  clearError: string;
}

const ClearLogsModal = ({
  showModal,
  setShowModal,
  handleClearLogs,
  clearError,
}: ClearLogsModalProps) => {
  const [clearByDate, setClearByDate] = useState("");
  const [clearPassword, setClearPassword] = useState("");
  const [step, setStep] = useState(1);

  const handleClose = () => {
    setShowModal(false);
    setStep(1);
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          {step === 1 && (
            <>
              <h2 className="text-lg font-medium mb-4">Clear Logs by Date</h2>
              <input
                type="date"
                placeholder="Date"
                value={clearByDate}
                onChange={(e) => setClearByDate(e.target.value)}
                className="input input-bordered w-full mb-4"
              />
              <button
                onClick={() => setStep(2)}
                className="inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              >
                Next
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="text-lg font-medium mb-4">
                Please Enter Password
              </h2>
              <input
                type="password"
                placeholder="Password"
                value={clearPassword}
                onChange={(e) => setClearPassword(e.target.value)}
                className="input input-bordered w-full mb-4"
              />
              <button
                onClick={() => handleClearLogs(clearByDate, clearPassword)}
                className="inline-block w-full rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-red-500 transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-red-600 focus:bg-red-700 focus:shadow-red-600 focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-red-700 motion-reduce:transition-none"
              >
                Clear Logs
              </button>
              <button
                onClick={handleClose}
                className="mt-2 inline-block w-full rounded bg-gray-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-gray-500 transition duration-150 ease-in-out hover:bg-gray-700 hover:shadow-gray-600 focus:bg-gray-700 focus:shadow-gray-600 focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-gray-700 motion-reduce:transition-none"
              >
                Cancel
              </button>
            </>
          )}
          {clearError && <div className="text-red-500 mt-4">{clearError}</div>}
        </div>
      </div>
    )
  );
};

export default ClearLogsModal;
