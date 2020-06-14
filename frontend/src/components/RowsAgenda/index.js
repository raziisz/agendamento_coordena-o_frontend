import React, { useState, useEffect } from "react";
import { FiEye, FiEdit3 } from "react-icons/fi";
import moment from "moment";

function RowsAgenda({ data }) {
  const [schedules, setSchedules] = useState([]);

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
            schedule.data = `${moment(d.dateReunion).format("DD/MM/YYYY")}`;
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
                <button
                  className="btn btn-sm btn-primary"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Detalhes de atividade"
                >
                  <FiEye size={20} color="#FFF" />
                </button>
                <button className="btn btn-sm btn-secondary">
                  <FiEdit3 size={20} color="#FFF" />
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
