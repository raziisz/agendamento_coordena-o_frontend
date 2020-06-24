import React, { useState } from "react";
import moment from 'moment';
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

import Loading from "../../../components/Loading";
import Nav from "../../../components/Nav";
import api from '../../../services/api'

import "./styles.css";

function Create() {
  const history = useHistory()
  const [load, setLoad] = useState(false);
  const [tipo, setTipo] = useState("");
  const [title, setTitle] = useState("")
  const [local, setLocal] = useState("")
  const [description, setDescription] = useState("")
  const [dateReunion, setDateReunion] = useState("")
  const [hourStart, setHourStart] = useState("")
  const [hourEnd, setHourEnd] = useState("")
  const [startProject, setStartProject] = useState("")
  const [endProject, setEndProject] = useState("")
  const [dateWork, setDateWork] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setLoad(true)

    const data = {
      title,
      tipo,
      local,
      description,
      dateReunion,
      hourStart,
      hourEnd,
      startProject,
      endProject,
      dateWork
    }
    
    try {
      const response = await api.post('agenda', data);

      toast.info(response.data.message)
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false)
    }

    history.push('/agenda')
  }

  function clearForm() {
    setLoad(true)
    setTipo("")
    setTitle("")
    setLocal("")
    setDescription("")
    setDateReunion("")
    setHourStart("")
    setHourEnd("")
    setStartProject("")
    setEndProject("")
    setDateWork("")

    setLoad(false)
  }

  return (
    <>
      <Loading loading={load} />
      <Nav />
      <div className="container p5">
        <div className="card">
          <div className="card-header">
            <h2>Formulário Nova Atividade</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-2">
                <div className="form-group col-md-6">
                  <label htmlFor="title">Título</label>
                  <input type="text" name="title" className="form-control"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="local">Local</label>
                  <input className="form-control" type="text" name="local"
                    value={local}
                    onChange={e => setLocal(e.target.value)}
                    required />
                </div>
              </div>
              <div className="row mb-2">
                <div className="form-group col-md-12">
                  <label htmlFor="description">Descrição</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="row mb-2">
                <div className="form-group col-md-2">
                  <label htmlFor="tipo">Tipo</label>
                  <select
                    name="tipo"
                    id="tipo"
                    className="form-control"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="Reunion">Reunião</option>
                    <option value="Work">Tarefa</option>
                    <option value="Project">Projeto</option>
                  </select>
                </div>
                {tipo === "Reunion" && (
                  <>
                    <div className="form-group col-md-4">
                      <label htmlFor="dateReunion">Data da Reunião</label>
                      <input type="date" className="form-control" min={moment().format("YYYY-MM-DD")}
                        value={dateReunion}
                        onChange={e => setDateReunion(e.target.value)}
                        required/>
                    </div>
                    <div className="form-group col-md-2">
                      <label htmlFor="hourStart">Hora inicial</label>
                      <input type="time" className="form-control"
                        value={hourStart}
                        onChange={e => setHourStart(e.target.value)}
                        required />
                    </div>
                    <div className="form-group col-md-2">
                      <label htmlFor="hourEnd">Hora final</label>
                      <input type="time" className="form-control"
                        value={hourEnd}
                        onChange={e => setHourEnd(e.target.value)} />
                    </div>
                  </>
                )}
                {tipo === "Work" && (
                  <>
                    <div className="form-group col-md-4">
                      <label htmlFor="dateWork">Data da Tarefa</label>
                      <input type="date" className="form-control" min={moment().format("YYYY-MM-DD")}
                        value={dateWork}
                        onChange={e => setDateWork(e.target.value)}
                        required/>
                    </div>
                  </>
                )}
                {tipo === "Project" && (
                  <>
                    <div className="form-group col-md-4">
                      <label htmlFor="startProject">Data inicial do projeto</label>
                      <input type="date" className="form-control" min={moment().format("YYYY-MM-DD")}
                        value={startProject}
                        onChange={e => setStartProject(e.target.value)}
                        required/>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="endProject">Data final do projeto</label>
                      <input type="date" className="form-control"
                        value={endProject}
                        onChange={e => setEndProject(e.target.value)}
                        min={startProject !== "" ? startProject : moment().format("YYYY-MM-DD")}
                        required/>
                    </div>
                  </>
                )}
              </div>
              <div className="row mb-2">
                <div className="col-md-3">
                  <button type="submit" className="btn btn-primary mr-2">Salvar</button>
                  <button type="button" className="btn btn-secondary ml-2" onClick={clearForm}>Limpar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
