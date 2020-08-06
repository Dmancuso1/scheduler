import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview} from "helpers/selectors";


export default function Application(props) {
  // const [day, setDay] = useState("Monday")
  // const [days, setDays] = useState([])

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




  const appts = getAppointmentsForDay(state, state.day).map(appt => {
    // console.log('appt', appt.interview);
    // console.log('student', appt.interview && appt.interview.student);
    const interview = getInterview(state, appt.interview);
    console.log('appt.interview', appt.interview)
    return (
      <Appointment
        key={appt.id} 
        id = {appt.id}
        time = {appt.time}
        interview = {interview} // invoking above function which is defined in helpers
      />
    );
  });

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
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">

        {appts} 
        <Appointment key="last" time="7pm" />

      </section>
    </main>
  );
}
