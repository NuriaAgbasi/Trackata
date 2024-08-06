
import React from 'react';
import { Link } from 'react-router-dom';

const Verify = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
            <div className="max-w-md w-full text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Please check your email</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    A verification email has been sent to your address. Please verify your email before logging in.
                </p>
                <Link to="/login" className="mt-6 text-indigo-600 hover:text-indigo-500">
                    Go to Login
                </Link>
            </div>
        </div>
    );
};

export default Verify;
