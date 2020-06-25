import React, { useState, useEffect } from "react";
import { FiTrash, FiEdit3 } from "react-icons/fi";

import moment from "moment";

function TrAgenda({ data }) {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    function loadSchedules() {
      return new Promise((resolve, reject) => {
        let schedules = [];
        data.forEach((d) => {
          let schedule = {};
          schedule.id = d.id;
          schedule.title = d.title;
          schedule.type = d.tipo;

          if (schedule.type === "Projeto") {
            schedule.data = `${moment(d.startProject).format(
              "DD/MM/YYYY"
            )} - ${moment(d.endProject).format("DD/MM/YYYY")}`;
          } else if (schedule.type === "Reunião") {
            schedule.data = `${moment(d.dateReunion).format("DD/MM/YYYY")}`;
          } else if (schedule.type === "Tarefa") {
            schedule.data = `${moment(d.dateWork).format("DD/MM/YYYY")}`;
          }
          schedules.push(schedule);
        });
        resolve(schedules);
      });
    }

    loadSchedules().then(schedules => setSchedules(schedules));
  }, [data]);
  return (
    <>
      {schedules.length > 0 ? (
        schedules.map((schedule) => (
          <tr key={schedule.id}>
            <th scope="row">{schedule.title}</th>
            <td>{schedule.data}</td>
            <td>{schedule.type}</td>
            <td>
              <div className="btn-group">
                <button className="btn btn-sm btn-secondary">
                  <FiEdit3 size={20} color="#FFF" />
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Detalhes de atividade"
                >
                  <FiTrash size={20} color="#FFF" />
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <>
          <tr>
              <td colSpan="4">
                Não há tarefas agendadas!!
              </td>
          </tr>
        </>
      )}
    </>
  );
}

export default TrAgenda;
