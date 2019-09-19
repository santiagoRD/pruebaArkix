//Librerias
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./config.js";

//Componentes
import Header from "./components/Header";
import Employees from "./components/Employees";
import AddEmployee from "./components/AddEmployee";
import Employee from "./components/Employee";
import EditEmployee from "./components/EditEmployee";

//Styles
import "./styles/App.css";
import "./fonts/style.css";

function App() {
  const [employees, saveEmployees] = useState([]);
  const [reloadEmployees, updateEmployees] = useState(true);
  useEffect(() => {
    if (reloadEmployees) {
      const consultarAPI = async () => {
        //Consultar la API
        try {
          const response = await axios.get(`${BASE_URL}employees`);
          // console.log(response);
          saveEmployees(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      consultarAPI();

      //Cambiar a false updateEmployees
      updateEmployees(false);
    }
  }, [reloadEmployees]);

  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route
            exact
            path="/employees"
            render={() => (
              <Employees
                employees={employees}
                updateEmployees={updateEmployees}
              />
            )}
          />
          <Route
            exact
            path="/create"
            render={() => <AddEmployee updateEmployees={updateEmployees} />}
          />
          <Route exact path="/employees/:id" component={Employee} />
          <Route
            exact
            path="/employees/editar/:id"
            render={() => <EditEmployee updateEmployees={updateEmployees} />}
          />
          <Route exact path="/" render={() => <Redirect to="/employees" />} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
