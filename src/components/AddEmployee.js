import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config.js";
import { withRouter } from "react-router-dom";
import "../styles/AddEmployee.css";

const AddEmployee = ({ updateEmployees, history }) => {
  const [name, saveName] = useState("");
  const [age, saveAge] = useState("");
  const [image, saveImage] = useState("");
  const [salary, saveSalary] = useState("");
  const [error, updateError] = useState(false);

  const submitNewEmployee = async e => {
    e.preventDefault();

    //Validar formulario
    if (
      name.trim() === "" ||
      age.trim() === "" ||
      image.trim() === "" ||
      salary.trim() === ""
    ) {
      updateError(true);
      return;
    }
    updateError(false);
    //Realizar envío a la API del objeto empleado
    try {
      const response = await axios.post(`${BASE_URL}create`, {
        name,
        salary,
        age
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    //Actualizar updateEmployees para refrescar el listado de empleados
    updateEmployees(true);
    //Redireccionar
    history.push("/employees");
  };

  return (
    <div className="container_add-employee">
      {error ? (
        <div className="container_add-employee-error">
          Todos los campos son obligatorios
        </div>
      ) : null}
      <form onSubmit={submitNewEmployee}>
        <div className="container_add-employee-elements">
          <label>
            <span>*</span>URL imagen:
          </label>
          <input
            type="text"
            value={image}
            onChange={e => saveImage(e.target.value)}
            className="container_add-employee-elements-input"
          />
        </div>
        <div className="container_add-employee-elements">
          <label>
            <span>*</span>Nombre:
          </label>
          <input
            type="text"
            value={name}
            onChange={e => saveName(e.target.value)}
            className="container_add-employee-elements-input"
          />
        </div>
        <div className="container_add-employee-elements">
          <label>
            <span>*</span>Edad:
          </label>
          <input
            type="text"
            value={age}
            onChange={e => saveAge(e.target.value)}
            className="container_add-employee-elements-input"
          />
        </div>
        <div className="container_add-employee-elements">
          <label>
            <span>*</span>Salario:
          </label>
          <input
            type="text"
            value={salary}
            onChange={e => saveSalary(e.target.value)}
            className="container_add-employee-elements-input"
          />
        </div>
        <button type="submit" className="add-employee-button">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default withRouter(AddEmployee);
