import React from "react";

interface ChangeEntry {
  date: string;
  changes: {
    [key: string]: [string, string];
  };
}

interface InfoProps {
  title: string;
  content: ChangeEntry[];
  onClose: () => void;
}

const Info = ({ title, content, onClose }: InfoProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-full px-4">
        <div className="grid h-screen place-items-center">
          <div className="max-w-xl w-full">
            <div className="bg-white p-10 rounded-md shadow-md">
              <button
                type="button"
                onClick={onClose}
                data-twe-ripple-init
                data-twe-ripple-color="light"
                className="bg-red-600 close inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              >
                &times;
              </button>
              <h4 className="text-blue mb-6 text-center text-2xl font-medium leading-tight">
                {title}
              </h4>
              <div className="mt-4">
                {content.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {content.map((entry, index) => (
                      <li key={index} className="mb-2">
                        <strong>Date:</strong> {entry.date}
                        <ul className="ml-4 list-circle">
                          {Object.entries(entry.changes).map(
                            ([key, [oldValue, newValue]], subIndex) => (
                              <li key={subIndex}>
                                <strong>{key}:</strong> {oldValue} &rarr;{" "}
                                {newValue}
                              </li>
                            )
                          )}
                        </ul>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No changes have been made.</p>
                )}
              </div>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={onClose}
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                  className="bg-red-700 ml-2 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
