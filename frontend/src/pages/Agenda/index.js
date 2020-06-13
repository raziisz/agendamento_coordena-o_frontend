import React, {useEffect, useState} from "react";
import Pagination from "@material-ui/lab/Pagination";
import Nav from "../../components/Nav";



import "./styles.css";

function Agenda() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

  })
  function handlePage() {
    return;
  }
  return (
    <>
      <Nav />
      <div className="container-fluid p-5">
          <div className="row mb-2">
            <div className="d-flex d-flex justify-content-between mb-3 col-12">
                <button className="btn btn-primary">Adicionar nova tarefa</button>
                <button className="btn btn-secondary">Ver tarefas passadas</button>
            </div>
          </div>
        <div className="row">
          <div className="d-flex d-flex justify-content-between mb-3 col-12">
            <h5>Proximas Atividades</h5>
            <Pagination
              count={1}
              color="primary"
              hidePrevButton
              hideNextButton
              onChange={handlePage}
            />
          </div>
          <div className="listContainer col-12">
            <div className="row text-center mb-3 row-head">
                <div className="col-2">
                    Título
                </div>
                <div className="col-4">
                    Descrição
                </div>
                <div className="col-3">
                    Data
                </div>
                <div className="col-3">
                    Ações
                </div>
            </div>
            <div className="row text-center mb-2 row-body">
            <div className="col-2">
                    REunião com os mestres
                </div>
                <div className="col-4">
                    Será feito uma reuniao e blablabla
                </div>
                <div className="col-3">
                    18/06/2020
                </div>
                <div className="col-3">
                    Ações
                </div>
            </div>
            <div className="row  text-center mb-2 row-body">
            <div className="col-2">
                    REunião com os mestres
                </div>
                <div className="col-4">
                    Será feito uma reuniao e blablabla
                </div>
                <div className="col-3">
                    18/06/2020
                </div>
                <div className="col-3">
                    Ações
                </div>
            </div>
            <div className="row text-center mb-2 row-body">
            <div className="col-2">
                    REunião com os mestres
                </div>
                <div className="col-4">
                    Será feito uma reuniao e blablabla
                </div>
                <div className="col-3">
                    18/06/2020
                </div>
                <div className="col-3">
                    Ações
                </div>
            </div>
          </div>
        </div>
        <div className="d-flex d-flex justify-content-center">
              <Pagination count={2} color="primary"  onChange={handlePage} />
        </div>
      </div>
    </>
  );
}

export default Agenda;
