import React, { useState, useEffect } from "react";
import { FiTrash, FiEdit3 } from "react-icons/fi";
import { toast } from 'react-toastify'
import moment from "moment";
import { useHistory } from 'react-router-dom'

import api from '../../services/api'

function RowsAgenda({ data }) {
  const [schedules, setSchedules] = useState([]);
  const history = useHistory()

  useEffect(() => {
    function loadSchedules() {
      return new Promise((resolve, reject) => {
        let schedules = [];
        data.forEach((d) => {
          let schedule = {};
          schedule.id = d.id;
          schedule.title = d.title;
          schedule.description = d.description;
          schedule.type = d.tipo;

          if (schedule.type === "Projeto") {
            schedule.data = `${moment(d.startProject).format(
              "DD/MM/YYYY"
            )} - ${moment(d.endProject).format("DD/MM/YYYY")}`;
          } else if (schedule.type === "Reunião") {
            schedule.data = `${moment(d.dateReunion).format("DD/MM/YYYY")} - das ${d.hourStart} às ${d.hourEnd}`;
          } else if (schedule.type === "Tarefa") {
            schedule.data = `${moment(d.dateWork).format("DD/MM/YYYY")}`;
          }
          schedules.push(schedule);
        });
        resolve(schedules);
      });
    }

    loadSchedules().then((schedules) => setSchedules(schedules));
  }, [data]);

  async function handleDelete(id) {
    let excluir = window.confirm('Deseja mesmo excluir está atividade?');

    if (!excluir) return;

    try {
      const response = await api.delete(`agenda/${id}`)

      if (response.status === 204) {
        toast.info('Atividade excluída com sucesso!')
        setSchedules(schedules.filter(schedule => schedule.id !== id))
      }
    } catch (error) {
      if(error?.response?.status === 404) {
        toast.error(error.response.data.message)
        history.push('/agenda')
      }
      if(error?.response?.status === 500) {
        toast.error('Houve um erro interno no servidor, tente novamente mais tarde!');
        history.push('/agenda')
      }
    }
  }

  function handleEdit(id) {
    history.push(`/agenda/editar/${id}`)
  }

  return (
    <>
      {schedules.length > 0 ? (
        schedules.map((schedule) => (
          <div className="row text-center mb-2 row-body" key={schedule.id}>
            <div className="col-2">{schedule.title}</div>
            <div className="col-4">{schedule.description}</div>
            <div className="col-3">{schedule.data}</div>
            <div className="col-3">
              <div className="btn-group">
                <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(schedule.id)}>
                  <FiEdit3 size={20} color="#FFF" />
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Excluir de atividade"
                  onClick={() => handleDelete(schedule.id)}
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

export default RowsAgenda;
