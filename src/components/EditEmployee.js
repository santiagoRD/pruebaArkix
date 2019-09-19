import React, { useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config.js";
import { withRouter } from "react-router-dom";
import "../styles/EditEmployee.css";

const EditEmployee = ({ match, updateEmployees, history }) => {
  const { id } = match.params;

  const [error, updateError] = useState(false);

  const nameRef = useRef("");
  const ageRef = useRef("");
  const salaryRef = useRef("");

  const submitEditEmployee = async e => {
    e.preventDefault();

    //validar campos del formulario
    if (
      nameRef.current.value.trim() === "" ||
      ageRef.current.value.trim() === "" ||
      salaryRef.current.value.trim() === ""
    ) {
      updateError(true);
      return;
    }
    updateError(false);

    //Realizar edicion en la API
    try {
      await axios.put(`${BASE_URL}update/${id}`, {
        name: nameRef.current.value,
        salary: salaryRef.current.value,
        age: ageRef.current.value
      });
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
      <h2>Editting Employee {id}</h2>
      {error ? (
        <div className="container_add-employee-error">
          Todos los campos son necesarios
        </div>
      ) : null}
      <form onSubmit={submitEditEmployee}>
        <div className="container_add-employee-elements">
          <label>Nombre: </label>
          <input
            type="text"
            ref={nameRef}
            className="container_add-employee-elements-input"
          />
        </div>
        <div className="container_add-employee-elements">
          <label>Edad: </label>
          <input
            type="text"
            ref={ageRef}
            className="container_add-employee-elements-input"
          />
        </div>
        <div className="container_add-employee-elements">
          <label>Salary: </label>
          <input
            type="text"
            ref={salaryRef}
            className="container_add-employee-elements-input"
          />
        </div>
        <button className="add-employee-button" type="submit">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default withRouter(EditEmployee);
