import React, { useEffect, useState, useRef } from "react";
import Pagination from "@material-ui/lab/Pagination";
import Nav from "../../components/Nav";
import { FiSearch } from "react-icons/fi";
import moment from 'moment';
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom';

import api from "../../services/api";
import RowsAgenda from '../../components/RowsAgenda';
import Loading from "../../components/Loading";

import "./styles.css";

function Agenda() {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [load, setLoad] = useState(false);
  const [title, setTitle] = useState("");
  const history = useHistory();

  useEffect(() => {
    api.get("agenda/atividades").then(response => {
      setTasks(response.data.schedules);
      const pag = response.headers.pagination;
      setPagination(JSON.parse(pag));
    })
  }, [])
  
  async function handlePage(e, value) {
    const pageSelected = parseInt(value);
    setLoad(true);
   let start = "";
   let end = "";
   
   if(startDate !== "" && endDate !== "") {
    start = moment(startDate).format("DD/MM/YYYY");
    end = moment(endDate).format("DD/MM/YYYY");
   }
    let filters = {}
    filters.pageNumber = pageSelected;
    filters.pageSize = pagination.itensPerPage;

    if(start && end) {

      filters.startDate = start;
      filters.endDate = end;
    }
    try {
      const response = await api.get("agenda/atividades", { params: { ...filters } })
      setTasks(response.data.schedules);
      const newPagination = JSON.parse(response.headers.pagination);
      setPagination(newPagination);
      
    } catch (error) {
      console.error(error);
      
    } finally {
      setLoad(false);
    }
  }

//   const delayedQueryStart = useRef(
//     debounce(e => {
//         comparaDates(e);
//         console.log("Debounce: " + e)
//     }, 5000)
// ).current
  async function handleSubmitFilter(e) {
    e.preventDefault();
    setLoad(true);
    if(!title) {
      if((!startDate && endDate) || (!endDate && startDate)) {
        toast.error("Para filtrar por data ambas devem ser preenchidas!");
        return;
      }
    }
    const dataStart = moment(startDate);
    const dataEnd = moment(endDate);

    if(dataStart > dataEnd) {
      toast.error("A data inicio deve ser menor que data final ou data final maior que data inicio");
      return;
    }

    let filters = {}
    
    if(title) filters.title = title;

    if(startDate && endDate) {
      filters.startDate = dataStart.format("DD/MM/YYYY");
      filters.endDate = dataEnd.format("DD/MM/YYYY");
    }

    try {
      const response = await api.get("agenda/atividades", { params: { ...filters } })
      console.log(response);
      setTasks(response.data.schedules);
      const newPagination = JSON.parse(response.headers.pagination);
      setPagination(newPagination);
      
    } catch (error) {
      console.error(error);
      
    } finally {
      setLoad(false);
    }


  }

  function newTask() {
    history.push("/agenda/novo")
  }

  return (
    <>
      <Loading loading={load}/>
      <Nav />
      <div className="container-fluid p-5">
        <div className="row mb-2">
          <div className="d-flex d-flex justify-content-between mb-3 col-12">
            <button className="btn btn-primary" onClick={newTask}>Adicionar nova tarefa</button>
            <button className="btn btn-secondary">Ver tarefas passadas</button>
          </div>
        </div>
        <div className="row mb-1 ml-2">
          <h3>Filtrar</h3>
        </div>
        <div className="row mb-1">
          <form onSubmit={handleSubmitFilter}  className="w-100">
            <div className="d-flex justify-content-start w-100">
              <div className="input-group mb-3 col-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <FiSearch />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Pesquisar por título"
                  aria-label="Pesquisar por título"
                  aria-describedby="basic-addon1"
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="input-group mb-3 col-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Inicial
                  </span>
                </div>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Data Inicial"
                  aria-label="Data Inicial"
                  aria-describedby="basic-addon1"
                  min={moment().format("YYYY-MM-DD")}
                  onChange={e => setStartDate(e.target.value)}
                  value={startDate}
                />
              </div>
              <div className="input-group mb-3 col-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Final
                  </span>
                </div>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Data Final"
                  aria-label="Data Final"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setEndDate(e.target.value)}
                  min={moment().format("YYYY-MM-DD")}
                  value={endDate}
                />
              </div>
              <div className="mb-3 col-3">
                <button type="submit" className="btn btn-primary">
                  Carregar
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="d-flex d-flex justify-content-between mb-3 col-12">
            <h5>Proximas Atividades</h5>
            <Pagination
              count={pagination.totalPages}
              color="primary"
              hidePrevButton
              hideNextButton
              onChange={handlePage}
            />
          </div>
          <div className="listContainer col-12">
            <div className="row text-center mb-3 row-head">
              <div className="col-2">Título</div>
              <div className="col-4">Descrição</div>
              <div className="col-3">Data</div>
              <div className="col-3">Ações</div>
            </div>
            <RowsAgenda data={tasks} />
          </div>
        </div>
        <div className="d-flex d-flex justify-content-center">
          <Pagination count={pagination.totalPages} color="primary" onChange={handlePage} />
        </div>
      </div>
    </>
  );
}

export default Agenda;
