import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";

import api from "../../services/api";
import logoImg from "../../assets/ag.png";
import "./styles.css";

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    if (!username || !password) {
      setLoading(false);
      return toast.error("Login e senha devem ser preenchidos");
    }

    try {
      const response = await api.post("auth", { username, password });
    //   console.log('resposta', response.data)
      toast.info(`Bem-vindo ${response.data.user.name}!`);
    //   localStorage.setItem('username', response.data.data.name);
    //   localStorage.setItem('auth', response.data.data.auth);

    //   history.push('home');
    } catch (error) {
      if (error.response) {
        console.log('erro', error.response)
        toast.error(error.response.data.message);
        console.log(error.response.status);
      } else if (error.request) {
        
        toast.error(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log(error)
        toast.error("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="container">
      <section className="form">
        <form onSubmit={handleLogin}>
          <h1>Faça seu login.</h1>

          <input
            type="text"
            placeholder="Digite seu Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite sua Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
      </section>
      <img src={logoImg} alt="Rede Amazônica" />
    </div>
  );
}
