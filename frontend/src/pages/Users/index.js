import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Pagination from "@material-ui/lab/Pagination";
import { FiUserPlus } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

import Loading from "../../components/Loading";
import Nav from "../../components/Nav";
import RowsUsers from "../../components/RowsUsers";
import api from "../../services/api";
import "./styles.css";

function Users() {
  const [load, setLoad] = useState(false);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const history = useHistory()

  useEffect(() => {
    setLoad(true);
    api
      .get("usuario")
      .then((response) => {
        setUsers(response.data.users);
        const pag = response.headers.pagination;
        setPagination(JSON.parse(pag));
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Houve um erro interno ao carregar dados dos usuários");
      });
    setLoad(false);
  }, []);

  function handleNewUser() {
    history.push("usuarios/novo")
  }
  return (
    <>
      <Loading loading={load} />
      <Nav />
      <div className="container p-5">
        <div className="card">
          <div className="card-header">
            <div className="d-flex d-flex justify-content-start col-12 border-0">
              <h3>Lista de usuários</h3>
            </div>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="d-flex d-flex justify-content-between mb-3 col-12">
                <button className="btn btn-primary" onClick={handleNewUser}>
                  <FiUserPlus size={20} color="#fff"/>
                </button>
                <Pagination
                  count={pagination.totalPages}
                  color="primary"
                  hidePrevButton
                  hideNextButton
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="listContainer col-12">
                <div className="row text-center mb-3 row-head">
                  <div className="col-1">Id</div>
                  <div className="col-3">Nome</div>
                  <div className="col-3">Email</div>
                  <div className="col-2">Função</div>
                  <div className="col-3">Ações</div>
                </div>
                <RowsUsers data={users} />
              </div>
            </div>
            <div className="d-flex d-flex justify-content-center">
              <Pagination
                count={pagination.totalPages}
                color="primary"
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
