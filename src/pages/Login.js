import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Background from '../components/background.tsx';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '') {
            setErrorMessage('All fields are required');
            return;
        }

        try {
            const success = await login(email, password);
            if (success) {
                navigate('/home', { replace: true });
            } else {
                setErrorMessage('Invalid login credentials');
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            setErrorMessage('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <Background className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
            <div className="w-full lg:flex lg:items-center lg:space-x-8">
                <div className="mr-5 lg:w-1/2 lg:flex lg:justify-center lg:items-center lg:text-left">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900">
                            Welcome Back
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Log in to your account to continue where you left off.
                        </p>
                    </div>
                </div>
                <div className="lg:w-1/2 lg:flex lg:justify-center lg:items-center mt-8 lg:mt-0">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Log In
                            </h2>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="bg-white appearance-none mb-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="bg-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            {errorMessage && (
                                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Log In
                                </button>
                            </div>

                            <div className="mt-4 text-center">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <a
                                        href="/signup"
                                        className="text-indigo-600 hover:text-indigo-700"
                                    >
                                        Sign Up
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Background>
    );
};

export default Login;
