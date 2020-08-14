
import React, { useState, useEffect } from "react";
import axios from "axios";
import { updateSpots } from "helpers/selectors";


export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });



  // Setting states
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointment = appointments => setState(prev => ({ ...prev, appointments }));
  const setInterviewers = interviewers => setState(prev => ({ ...prev, interviewers }));


  // Axios to get data from db
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        setDays(all[0].data)
        setAppointment(all[1].data)
        setInterviewers(all[2].data)
      })
  }, []);




  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const apptId = appointment.id
    const url = `/api/appointments/${apptId}`
    return axios.put(url, appointment)
      .then((res) => {
        // console.log('httpStatus: ', res.status);
        setState(prev => {
          const newState = { ...prev, appointments }
          let updatedDays = updateSpots(newState)
          newState.days = updatedDays
          return newState
        })

      })
  };




  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const apptId = appointment.id
    const url = `/api/appointments/${apptId}`
    return axios.delete(url, appointment)
      .then((res) => {
        // console.log('httpStatus: ', res.status);
        setState(prev => {
          const newState = { ...prev, appointments }
          let updatedDays = updateSpots(newState)
          newState.days = updatedDays
          return newState
        })
      })
  };
  return { state, setDay, bookInterview, cancelInterview }
};
