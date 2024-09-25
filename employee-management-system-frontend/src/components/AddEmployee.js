import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const navigaye = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };

  const saveEmployee = (e) => {
    e.preventDefault();
    EmployeeService.saveEmployee(employee)
      .then((response) => {
        console.log(response);
        navigaye("/employeeList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setEmployee({
      id: "",
      firstName: "",
      lastName: "",
      emailId: "",
    });
  };

  return (
    <div className="flex flex-col max-w-2xl mx-auto shadow border-b p-8">
  <h1 className="font-thin text-2xl tracking-wider text-blue-950 text-center ">
    Add New Employee
  </h1>

  <div className="my-4">
    <label className="block text-blue-950 text-sm font-normal">
      First Name
    </label>
    <input
      type="text"
      name="firstName"
      value={employee.firstName}
      onChange={(e) => handleChange(e)}
      className="h-10 w-full border mt-2 px-2 py-2"
    />
  </div>

  <div className="my-4">
    <label className="block text-blue-950 text-sm font-normal">
      Last Name
    </label>
    <input
      type="text"
      name="lastName"
      value={employee.lastName}
      onChange={(e) => handleChange(e)}
      className="h-10 w-full border mt-2 px-2 py-2"
    />
  </div>

  <div className="my-4">
    <label className="block text-blue-950 text-sm font-normal">
      Email
    </label>
    <input
      type="email"
      name="emailId"
      value={employee.emailId}
      onChange={(e) => handleChange(e)}
      className="h-10 w-full border mt-2 px-2 py-2"
    />
  </div>

  <div className="flex justify-center space-x-4 pt-4">
    <button
      onClick={saveEmployee}
      className="rounded text-white font-semibold bg-blue-950 hover:bg-blue-700 py-2 px-6"
    >
      Save
    </button>
    <button
      onClick={reset}
      className="rounded text-white font-semibold bg-teal-400 hover:bg-teal-700 py-2 px-6"
    >
      Clear
    </button>
  </div>
</div>

  );
};

export default AddEmployee;