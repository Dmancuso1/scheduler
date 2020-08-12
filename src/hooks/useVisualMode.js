// setting the states and functions for visual modes.

import React, { useState } from "react";

export default function useVisualMode(initial) {
const [mode, setMode] = useState(initial);
const [history, setHistory] = useState([initial]);

const transition = (newMode, replace = false) => {
  if (!replace) {
    setMode(newMode)
    setHistory(prevHistory => [...prevHistory, newMode])
  } else {
    setHistory(prevHistory => [
      ...prevHistory.slice(0, prevHistory.length -1),
      newMode
    ])
    setMode(newMode)
  }
}



const back = () => {
  if (history.length < 2) {return}
    setHistory(prevHistory => prevHistory.slice(0, prevHistory.length -1))
    const lastMode = history.slice(0, history.length -1)[history.length -2]
    setMode(lastMode)
}

return { mode, transition, back, history }
};

