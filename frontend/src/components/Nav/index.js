import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { logout, getUser, decoded } from '../../services/auth';


import './styles.css'

function Nav() {
    const history = useHistory();
    const [user, setUser] = useState({})
    const [role, setRole] = useState("")

    useEffect(() => {
        setUser(getUser())
        const userFromToken = decoded()
        setRole(userFromToken.role)
    }, [])

    function handleLogout() {
        logout();
        history.push("/");
    }
  return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light m-0">
            <Link className="navbar-brand" to="/home">Agendamento FAMETRO</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
    
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/agenda"> Ver Agenda</Link>
                    </li>
                    {role == 'Admin' && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/usuarios">Usuários</Link>
                        </li>
                    )}
                </ul>
                <ul className="navbar-nav ml-auto mr-5">
                    <li className="nav-item dropdown mr-3">
                        <label className=" pontier nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {user.name}
                        </label>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item">Editar Perfil</a>
                            <a className="dropdown-item" onClick={handleLogout}>Sair</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </>
  );
}

export default Nav;
