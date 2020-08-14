import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE ";
const ERROR_DELETE = "ERROR_DELETE"


export default function Appointment(props) {
  // Saves appointment and passes intervew obj as prop
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
      .catch(err => transition(ERROR_SAVE, true)) 
  }

  // Cancels appointment and passes null intervew as prop
  function onDelete() {
    const interview = null
    transition(DELETING, true);
    props.cancelInterview(props.id, interview)
      .then(() => {
        transition(EMPTY);
      })
      .catch(err => transition(ERROR_DELETE, true)); 
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
    <article data-testid="appointment" className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={initTransition}
      />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {
            transition(CONFIRM)
          }}
          onEdit={() => { transition(EDIT) }}
        />
      )}
      {mode === CREATE &&
        (<Form
          onCancel={back}
          interviewers={props.interviewersForDay}
          onSave={save}

        />
        )}
      {mode === SAVING &&
        (<Status
          message="Saving..."
        />
        )}
      {mode === DELETING &&
        (<Status
          message="Deleting..."
        />
        )}
      {mode === CONFIRM &&
        (<Confirm
          message="Are you sure you would like to delete?"
          onConfirm={onDelete}
          onCancel={back}
        />
        )}
      {mode === EDIT &&
        (<Form
          onCancel={back}
          interviewers={props.interviewersForDay}
          onSave={save}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
        )}
      {mode === ERROR_SAVE &&
        (<Error
          onClose={() => {
            props.interview ? transition(SHOW) : transition(EMPTY);
          }}
          message="Could not save Appointment"
        />
        )}

      {mode === ERROR_DELETE &&
        (<Error
          onClose={back}
          message="Could not delete Appointment"
        />
        )}

    </article>

  )
}