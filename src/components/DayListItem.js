import React from "react";

import "components/DayListItem.scss";

const classNames = require('classnames') // see docs: https://github.com/JedWatson/classnames#usage


const formatSpots = (numOfSpots) => {
  if (numOfSpots === 0) {
    return "no spots remaining";
  } else if (numOfSpots === 1) {
    return "1 spot remaining"
  } else {
    return `${numOfSpots} spots remaining`
  }
};


export default function DayListItem(props) {

  let DayListItemClass = classNames("day-list__item ", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={DayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h4>{formatSpots(props.spots)}</h4>
    </li>
  );
}