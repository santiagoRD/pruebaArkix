//Librerias
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

//Config
import { BASE_URL } from "../config.js";

//Styles
import "../styles/Employee.css";

const Employee = ({
  id,
  employee_name,
  employee_salary,
  employee_age,
  profile_image,
  updateEmployees
}) => {
  const eliminarProducto = id => {
    //Confirmacion de sweet alert
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Un producto eliminado no se puede recuperar",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        Swal.fire(
          "Eliminado!",
          "El producto se eliminó correctamente",
          "success"
        );
        //Al aceptar eliminar empleado se hace la peticion a la API
        axios
          .delete(`${BASE_URL}delete/${id}`)
          .then(response => {
            updateEmployees(true);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div className="employees_container-inferior-elements">
      {/* <div>
        <img src={profile_image} alt="" />
      </div> */}
      <div>
        <p>
          <span className="elements-span">Nombre empleado:</span>{" "}
          {employee_name}
        </p>
        <p>
          <span className="elements-span">Edad Empleado:</span> {employee_age}
        </p>
        <p>
          <span className="elements-span">Salario empleado:</span>{" "}
          {employee_salary}
        </p>
      </div>
      <div className="employees_container-inferior-buttons">
        <Link
          to={`/employees/editar/${id}`}
          className="employees_container-inferior-edit"
        >
          Edit
        </Link>
        <button
          className="employees_container-inferior-delete"
          onClick={() => eliminarProducto(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Employee;
