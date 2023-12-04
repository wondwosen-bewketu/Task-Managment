// Header.js
import React from 'react';

const Header = () => {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-gray-300 text-2xl font-bold">Task Manager</h1>
        </div>
        <div className="flex space-x-4">
          <a href="/" className="text-white hover:underline">Home</a>
          <a href="/taskList" className="text-white hover:underline">About</a>
          {/* Add more navigation links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
