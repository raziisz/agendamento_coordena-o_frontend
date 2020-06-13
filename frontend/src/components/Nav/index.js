import React from "react";
import { Link } from 'react-router-dom';


import './styles.css'

function Nav() {

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
                    <li className="nav-item">
                        <a className="nav-link" href="#">Usuários</a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto mr-5">
                    <li className="nav-item dropdown mr-3">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Username
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Editar Perfil</a>
                            <a className="dropdown-item" href="#">Sair</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </>
  );
}

export default Nav;
