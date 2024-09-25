import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-950">
      <div className="h-16 px-8 flex items-center justify-between">
        <p 
          className='text-white font-bold cursor-pointer' 
          onClick={() => navigate('/')}
        >
          Employee Management System
        </p>
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate('/')} 
            className="text-blue bg-white  px-4 py-2 rounded hover:bg-teal-400 transition"
          >
            Show Employees
          </button>
          <button 
            onClick={() => navigate('/addEmployee')} 
            className="text-blue bg-white  px-4 py-2 rounded hover:bg-teal-400 transition"
          >
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
