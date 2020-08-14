// Sets the history state based on which mode the users selects. 
// After initial mode is set we can transition (add to the array), go back (remove from the array), replace (replace last item in array)

import React, { useState } from "react";

export default function useVisualMode(initial) {
const [mode, setMode] = useState(initial);
const [history, setHistory] = useState([initial]);

// Sets the new mode and adds to the history array. 
// If the mode replace is truthy, then it replaces array element.
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


// returns to the previous mode if there are less than 2 elements in the history.
const back = () => {
  if (history.length < 2) {return}
    setHistory(prevHistory => prevHistory.slice(0, prevHistory.length -1))
    const lastMode = history.slice(0, history.length -1)[history.length -2]
    setMode(lastMode)
}

return { mode, transition, back, history }
};

