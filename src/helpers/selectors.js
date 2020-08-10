// will return an array of appointments for the given day.
// this can be refactored with .find and then .map...
export const getAppointmentsForDay = (state, day) => {
  let results = []
  for (const obj of state.days) {
    if (obj.name === day) {
      for (const dayAppt of obj.appointments) {
        for (const appt of Object.values(state.appointments)) {
          if (dayAppt === appt.id) {
            results.push(appt)
          }
        }
      }
    }
  }
  return results
}


export const getInterview = (state, interview) => {
  let interviewerId;
  const output = {}
  if (!interview) {
    return null
  } else {
    interviewerId = interview.interviewer
    output.student = interview.student
    output.interviewer = state.interviewers[interviewerId]
    return output
  }
};


export const getInterviewersForDay = (state, day) => {
  let results = []
  for (const obj of state.days) {
    if (obj.name === day) {
      for (const dayAppt of obj.interviewers) {
        for (const appt of Object.values(state.interviewers)) {
          if (dayAppt === appt.id) {
            results.push(appt)
          }
        }
      }
    }
  }
  return results
}

// function that updates spots for all days
export const updateSpots = (state) => {
  const updatedDays = [...state.days]
  for (const day of updatedDays) {
    let updatedSpots = 0;
    day.appointments.forEach((appointmentId) => {
      if (state.appointments[appointmentId].interview === null) {
        updatedSpots++
      }
    })
    
    day.spots = updatedSpots
  }
  return updatedDays
}
