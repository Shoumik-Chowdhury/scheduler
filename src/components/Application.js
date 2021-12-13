import React, {useState, useEffect} from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";

import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })
  
  const setDay = day => setState({ ...state, day });
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentList = dailyAppointments.map(appointment => <Appointment key={appointment.id} {...appointment} />);
  
  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("api/appointments")
    ])
    .then(res => {
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data}));
    })
  
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
