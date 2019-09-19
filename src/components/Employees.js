//Librerias
import React, { useState } from "react";
import { Link } from "react-router-dom";
//Componentes
import Employee from "./Employee.js";
//Styles
import "../styles/Employees.css";

const Employees = ({ employees, updateEmployees }) => {
  const [searchEmployee, updateSearchName] = useState("");

  //Filtrar los empleados
  const filterEmployees = employees.filter(employee => {
    if (
      employee.employee_name
        .toLowerCase()
        .includes(searchEmployee.toLocaleLowerCase()) ||
      employee.employee_age.includes(searchEmployee) ||
      employee.employee_salary.includes(searchEmployee)
    ) {
      return employee;
    }
  });

  return (
    <div className="employees_container">
      <div className="employees_container-superior">
        <div className="employees_container-superior_search">
          <span className="icon-search"></span>
          <input
            type="text"
            className="employees_superior_search-input"
            placeholder="Search Employees"
            onChange={e => updateSearchName(e.target.value)}
          />
        </div>
        <Link to="/create" className="employees_superior-add">
          ADD
        </Link>
      </div>
      <div className="employees_container-inferior">
        {filterEmployees.map(
          ({
            id,
            employee_name,
            employee_salary,
            employee_age,
            profile_image
          }) => (
            <Employee
              key={id}
              id={id}
              employee_name={employee_name}
              employee_salary={employee_salary}
              employee_age={employee_age}
              profile_image={profile_image}
              updateEmployees={updateEmployees}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Employees;
