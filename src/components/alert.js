import React, { useState, useEffect } from "react";

const Alert = ({ message, type, duration = 3000 }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timeout = setTimeout(() => {
                setVisible(false);
            }, duration);
            return () => clearTimeout(timeout);
        }
    }, [message, duration]);
    const alertClasses = `rounded-md p-4 bg-${type}-100 text-${type}-700 border border-${type}-200`;

    return (
        <div
            className={`fixed top-4 right-4 z-50 ${visible ? "block" : "hidden"
                } transition duration-300 ease-in-out`}
        >
            <div className={alertClasses}>
                {message}
            </div>
        </div>
    );
};

export default Alert;
