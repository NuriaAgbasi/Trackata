import React from 'react';

const Unauthorized = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900">Unauthorized</h1>
                <p className="text-lg text-gray-600 mt-2">You do not have access to this page.</p>
            </div>
        </div>
    );
};

export default Unauthorized;
