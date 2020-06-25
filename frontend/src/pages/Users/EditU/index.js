import React, { useState, useEffect } from "react";

import Loading from '../../../components/Loading'
import Nav from '../../../components/Nav'
import api from '../../../services/api'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

import './styles.css'

function EditU({ match }) {
    const [load, setLoad] = useState(false);
    const [id, setId] = useState("")
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [typeUser, setTypeUser] = useState("");
    const history = useHistory()

    useEffect(() => {
      async function loadUser() {
        setLoad(true)
        const id = match.params.id
        try {
          const response = await api.get(`usuario/${id}`)

          const { ...user} = response.data
          setId(user.id)
          setName(user.name)
          setLastName(user.lastName)
          if (user.role === 'Admin') {
            setTypeUser("0")
          } else if (user.role === 'User') {
            setTypeUser("1")
          }
          setEmail(user.email)
        } catch (error) {
          if(error?.response?.status === 404) {
            toast.error(error.response.data.message)
            history.push('/usuarios')
          }
          if(error?.response?.status === 500) {
            toast.error('Houve um erro interno no servidor, tente novamente mais tarde!');
            history.push('/usuarios')
          }
        } finally {
          setLoad(false)
        }

      }

      loadUser()
    }, [])

    async function handleSubmit(e) {
      e.preventDefault()
      setLoad(true)

      if((password !== confirmPassword) && (password !== "" && confirmPassword !== "")) {
        setLoad(false);
        return toast.error("Senhas não conferem!");
      }

      const data = {
        name,
        lastName,
        password,
        email,
        typeUser: parseInt(typeUser)
      }

      try {
        const response = await api.put(`usuario/${id}`, data)
        if (response.status === 204) {
          toast.info('Usuário atualizado com sucesso!')
          history.push('/usuarios')
        }
      } catch (error) {
        if(error?.response?.status === 400) {
          toast.error(error.response.data.message)
        }
        console.log(error)
      } finally {
        setLoad(false)
      }


    }
  return (
    <>
      <Loading loading={load} />
      <Nav />
      <div className="container p5">
        <div className="card">
          <div className="card-header">
            <h2>Formulário Edição de Usuário</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-2">
                <div className="form-group col-md-6">
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="lastName">Sobrenome</label>
                  <input
                    className="form-control"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="form-group col-md-6">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control"
                    name="email" value={email}
                    onChange={e => setEmail(e.target.value)}/>
                </div>
              </div>
              <div className="row mb-2">
                <div className="form-group col-md-3">
                  <label htmlFor="type">Tipo</label>
                  <select
                    name="type"
                    id="type"
                    className="form-control"
                    value={typeUser}
                    onChange={(e) => setTypeUser(e.target.value)}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="0">Administrador</option>
                    <option value="1">Usuário</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="password">Senha</label>
                  <input type="password" className="form-control"
                    name="password" value={password}
                    onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="confirmPassword">Confirmar senha</label>
                  <input type="password" className="form-control"
                    name="confirmPassword" value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}/>
                </div>
              </div>
              <div className="row mb-2 mt-5">
                <div className="col-md-3">
                  <button type="submit" className="btn btn-primary mr-2">
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ml-2"
                    onClick={() => {}}
                  >
                    Limpar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditU
