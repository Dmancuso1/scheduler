import React, { useState } from "react";

import InterviewerList from "../InterviewerList"
import Button from "../Button";

import "./styles.scss";

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  console.log(props);

  const reset = () => { 
    setName("");
    setInterviewer(null)
  };

  const cancel = () => {
    reset();
    props.onCancel()
  };

  const save = () => {
    props.onSave(name, interviewer)
  };



  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            value={name}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
          /*
            This must be a controlled component
          */
         onChange={(event) => {
           return setName(event.target.value)
          }}
          />
        </form>

        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  )
}