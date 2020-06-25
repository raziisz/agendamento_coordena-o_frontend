import React, { useState, useEffect } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { useHistory } from "react-router-dom"
import { decoded } from '../../services/auth'
import  api  from '../../services/api'

import './styles.css'
import { toast } from "react-toastify";


function RowsUsers({ data }) {
  const history = useHistory()
  const [users, setUsers] = useState([]);
  const userToken = decoded()


  useEffect(() => {
    function loadUsers() {
      return new Promise((resolve, reject) => {
        
        let users = [];
        data.forEach((d) => {
          let user = {};
          user.id = d.id;
          user.name = d.name;
          user.email = d.email;
          user.role = d.role;

          users.push(user);
        });
        resolve(users);
      });
    }

    loadUsers().then((users) => setUsers(users));
  }, [data]);

  function handleEdit(id) {
    history.push(`/usuarios/editar/${id}`)
  }

  async function handleDelete(id) {
    let excluir = window.confirm('Deseja mesmo excluir esse usuário?');

    if (!excluir) return;
    
    try {
      const response = await api.delete(`usuario/${id}`)

      if (response.status === 204) {
        toast.info('Usuário excluído com sucesso!')
        setUsers(users.filter(user => user.id !== id))
      }
    } catch (error) {
      if(error?.response?.status === 404) {
        toast.error(error.response.data.message)
        history.push('/usuarios')
      }
      if(error?.response?.status === 500) {
        toast.error('Houve um erro interno no servidor, tente novamente mais tarde!');
        history.push('/usuarios')
      }
    }
  }

  return (
    <>
      {users.length > 0 ? (
        users.map((user) => (
          <div className="row text-center mb-2 row-body" key={user.id}>
            <div className="col-1">{user.id}</div>
            <div className="col-3">{user.name}</div>
            <div className="col-3">{user.email}</div>
            <div className="col-2">{user.role}</div>
            <div className="col-3">
              <div className="btn-group">
                <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(user.id)}
                  disabled={user.id == userToken.nameid}>
                  <FiEdit3 size={20} color="#FFF" />
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Detalhes de usuário"
                  disabled={user.id == userToken.nameid}
                  onClick={() => handleDelete(user.id)}
                >
                  <FiTrash size={20} color="#FFF" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="row text-center mb-2 row-body">
          <h3>Sem dados...</h3>
        </div>
      )}
    </>
  );
}

export default RowsUsers;
