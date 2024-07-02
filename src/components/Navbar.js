import React from 'react';

const Navbar = ({ toggleSidebar }) => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <button onClick={toggleSidebar} className="text-xl">
                &#9776; {/* Hamburger icon */}
            </button>
            <h1 className="inline ml-4">Your App</h1>
        </nav>
    );
};

export default Navbar;