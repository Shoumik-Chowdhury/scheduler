import React, {useState, useEffect} from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  const setDay = day => setState({ ...state, day });
  
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentList = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment key={appointment.id} {...appointment} interview={interview} interviewers={dailyInterviewers} />
    );
  });
  
  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then(res => {
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data}));
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
