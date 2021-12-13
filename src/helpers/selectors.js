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