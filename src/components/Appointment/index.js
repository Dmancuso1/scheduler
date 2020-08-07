import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode"




const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";


export default function Appointment(props) {
  //  console.log('APPOINTMENT PROPS', props);


  /*
  We pass this function to the Form component. The Form should capture the name and interviewer and pass them to props.onSave as arguments. We then create a new interview object to be passed to props.bookInterview.
  */
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
  }

  function onDelete() {
    const interview = null

    transition(DELETING);
    props.cancelInterview(props.id, interview)
      .then(() => {
        transition(EMPTY);
      })
  }




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
      // bookInterview = {props.bookInterview} // ??????
      />
      {mode === EMPTY && <Empty onAdd={initTransition}
      // bookInterview = {props.bookInterview} // ??????
      />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          // bookInterview = {props.bookInterview} // ??????
          onDelete={(() => {
            transition(CONFIRM)
          })}
        />
      )}
      {mode === CREATE &&
        (<Form
          onCancel={cancel}
          interviewers={props.interviewersForDay}
          // bookInterview = {props.bookInterview} // ??????
          onSave={save}

        />)}
      {mode === SAVING &&
        (<Status
          message = "Saving..."
        />
        )}
      {mode === DELETING &&
        (<Status
        message = "Deleting..."
        />
        )}
      {mode === CONFIRM &&
        (<Confirm
          message = "Delete the appointment?"
          onConfirm = {onDelete}
          onCancel = {back}
        />
        )}

    </article>

  )
}