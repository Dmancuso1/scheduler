/* https://web.compass.lighthouselabs.ca/days/w07d5/activities/1024

Create a new file hooks/useApplicationData.js and move the logic used to manage the state from the components/Application.js into it.
*/


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




  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointment = appointments => setState(prev => ({ ...prev, appointments }));
  const setInterviewers = interviewers => setState(prev => ({ ...prev, interviewers }));

  const url1 = "/api/days"
  const url2 = "/api/appointments"
  const url3 = "/api/interviewers"

  useEffect(() => {
    Promise.all([
      axios.get(url1),
      axios.get(url2),
      axios.get(url3)
    ])
      .then((all) => {
        // console.log('ALL',all)
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
        console.log('httpStatus: ', res.status);
        // setState({ ...state, appointments })
        setState(prev => {
          const newState = { ...prev, appointments }
          updateSpots(newState)
          return newState
        })
        // 

      })
    // .catch((err) => {
    //   console.log('catch', err);
    // });
  };

  const cancelInterview = (id, interview) => {
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
    console.log(appointment);
    return axios.delete(url, appointment)
      .then((res) => {
        console.log('httpStatus: ', res.status);
        // setState({ ...state, appointments })
        setState(prev => {
          const newState = { ...prev, appointments }
          updateSpots(newState)
          return newState
        })
      })
    // .catch((err) => {
    //   console.log('catch', err);
    // });
  };


  return { state, setDay, bookInterview, cancelInterview }
};
