import React, { useState, useEffect } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";


function RowsUsers({ data }) {
  const [users, setUsers] = useState([]);


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
                <button className="btn btn-sm btn-secondary">
                  <FiEdit3 size={20} color="#FFF" />
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Detalhes de usuário"
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
