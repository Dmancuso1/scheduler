import React from "react";

import "components/DayListItem.scss";

const classNames = require('classnames') // see docs: https://github.com/JedWatson/classnames#usage



export default function DayListItem(props) {

  let DayListItemClass = classNames("day-list__item ", {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : props.spots === 0 
  });

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={DayListItemClass}>{props.name}</h2> 
      <h3 className={DayListItemClass}>{props.spots} spots remaining</h3>
    </li>
  );
}