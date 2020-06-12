import React from "react";
import Nav from "../../components/Nav";
import { FiEye, FiEdit3 } from 'react-icons/fi';
import { login } from "../../services/auth";

import "./styles.css";

function Home() {
  return (
    <>
      <Nav />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Seus proximos compromissos</h3>
            <table class="table table-dark mt-5 text-center">
              <thead>
                <tr>
                  <th scope="col">Título</th>
                  <th scope="col">Data</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Reunião x</th>
                  <td>18/06/2020</td>
                  <td>Atividade</td>
                  <td>
                      <div className="btn-group">
                          <button className="btn btn-sm btn-primary"
                          data-toggle="tooltip" data-placement="top" title="Detalhes de atividade">
                              <FiEye size={20} color="#FFF"/>
                          </button>
                          <button className="btn btn-sm btn-secondary">
                              <FiEdit3 size={20} color="#FFF"/>
                          </button>
                      </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Atividade y</th>
                  <td>15/06/2020</td>
                  <td>Atividade</td>
                  <td>
                      <div className="btn-group">
                          <button className="btn btn-sm btn-primary"
                          data-toggle="tooltip" data-placement="top" title="Detalhes de atividade">
                              <FiEye size={20} color="#FFF"/>
                          </button>
                          <button className="btn btn-sm btn-secondary">
                              <FiEdit3 size={20} color="#FFF"/>
                          </button>
                      </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Projeto</th>
                  <td>18/06/2020</td>
                  <td>Atividade</td>
                  <td>
                      <div className="btn-group">
                          <button className="btn btn-sm btn-primary"
                          data-toggle="tooltip" data-placement="top" title="Detalhes de atividade">
                              <FiEye size={20} color="#FFF"/>
                          </button>
                          <button className="btn btn-sm btn-secondary">
                              <FiEdit3 size={20} color="#FFF"/>
                          </button>
                      </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Reunião</th>
                  <td>18/06/2020</td>
                  <td>Atividade</td>
                  <td>
                      <div className="btn-group">
                          <button className="btn btn-sm btn-primary"
                          title="Detalhes de atividade">
                              <FiEye size={20} color="#FFF"/>
                          </button>
                          <button className="btn btn-sm btn-secondary"
                            title="Editar tarefa">
                              <FiEdit3 size={20} color="#FFF"/>
                          </button>
                      </div>
                  </td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
