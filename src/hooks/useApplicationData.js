import { useState, useEffect } from "react";
import axios from "axios";


const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  
  const setDay = day => setState({ ...state, day });
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`api/appointments/${id}`, { interview })
    .then(() => setState({ ...state, appointments }));
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
    
    return axios.delete(`api/appointments/${id}`)
    .then(() => setState({ ...state, appointments }))
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

  return {state, setDay, bookInterview, cancelInterview}
}

export default useApplicationData;