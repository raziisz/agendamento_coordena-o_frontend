import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import TrAgenda from "../../components/TrAgenda";

import api from "../../services/api";

import "./styles.css";

function Home() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    api
      .get("agenda")
      .then((response) => {
        setTasks(response.data.schedules);
        console.log('task', tasks)
        console.log('response', response.data)
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Nav />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Seus proximos compromissos</h3>
            <table className="table table-dark mt-5 text-center">
              <thead>
                <tr>
                  <th scope="col">Título</th>
                  <th scope="col">Data</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                <TrAgenda data={tasks} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
