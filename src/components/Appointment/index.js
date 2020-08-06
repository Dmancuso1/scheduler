import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode"




// export default function Appointment(props) {
//   console.log(props);
//   return (
//   <article className="appointment">
//     <Header
//       time = {props.time}
//     />
//     {props.interview ? 
//     <Show 
//       student = {props.interview.student}
//       interviewer = {props.interview.interviewer}
//     /> 
//     : 
//     <Empty/>}
//   </article>

//   )
// }

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment(props) {
  // console.log(props);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const initTransition = () => {
    transition(CREATE)
  }

  const cancel = () => {
    transition(EMPTY)
  }

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={initTransition} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form
        onCancel = {cancel}
        interviewers={[]}

      />}

    </article>

  )
}