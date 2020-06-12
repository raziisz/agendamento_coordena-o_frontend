import React from "react";

import './styles.css'

function Nav() {
  return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light m-0">
            <a className="navbar-brand" href="#">Agendamento FAMETRO</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
    
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#"> Agendar</a>
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
