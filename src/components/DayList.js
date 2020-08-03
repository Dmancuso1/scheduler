import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  console.log(props);
  const days = props.days;
  const dayListItems = days.map(day => {
    return (
      <DayListItem
      id = {day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay} />
      );
  })
  return dayListItems;
}