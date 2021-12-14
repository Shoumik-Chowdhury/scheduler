export function getAppointmentsForDay(state, dayName) {
  //... returns an array of appointments for that day

  let appointments = [];
  let result = [];

  for (let day of state.days) {
    if (day.name === dayName) {
      appointments = day.appointments;
    }
  }

  for (let appointment of appointments) {
    result.push(state.appointments[appointment]);
  }

  return result;
}

export function getInterviewersForDay(state, dayName) {
  //... returns an array of interviewers for that day

  let interviewers = [];
  let result = [];

  for (let day of state.days) {
    if (day.name === dayName) {
      interviewers = day.interviewers;
    }
  }

  for (let interviewer of interviewers) {
    result.push(state.interviewers[interviewer]);
  }

  return result;
}

export function getInterview(state, interview) {

  let result = null;

  if (interview) {
    let interviewerId = interview.interviewer;
    result = { student: interview.student, interviewer: state.interviewers[interviewerId] };
  }

  return result;

}