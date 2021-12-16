import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";


const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });

  function getSpotsUpdatedDays(spotChange) {

    return state.days.map((e) => {
      //spotChange accounts for the spots change by the axios request
      let spots = 0 + spotChange; 
      // find the day currently in state
      if (e.name ===  state.day) {
        // get appointment objects for the day
        const app = getAppointmentsForDay(state, state.day);
        // count # of interview with nulll value
        app.forEach(appointment => {
          if (appointment.interview === null) {
            spots += 1;
          }
        });
        // return day object with updated spots
        return {...e, spots}
      }
      // for all other days no change
      return e;
    })

  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = getSpotsUpdatedDays(-1);

    return axios.put(`api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, appointments, days }))     
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const days = getSpotsUpdatedDays(1);

    return axios.delete(`api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days }))
  }

  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(res => {
        setState(prev => ({ ...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }));
      })

  }, [])

  return { state, setDay, bookInterview, cancelInterview }
}

export default useApplicationData;