import React from 'react';

function makeAge(hours, long = false) {
  let text = '';
  let hoursInTime = {
    year: 24 * 7 * 4 * 12,
    month: 24 * 7 * 4,
    week: 24 * 7,
    day: 24
  }
  let years = Math.floor(hours / hoursInTime.year);
  hours = hours % hoursInTime.year;
  let months = Math.floor(hours / hoursInTime.month);
  hours = hours % hoursInTime.month;
  let weeks = Math.floor(hours / hoursInTime.week);
  hours = hours % hoursInTime.week;
  let days = Math.floor(hours / hoursInTime.day);
  hours = hours % hoursInTime.day;
  
  if(long === false) {
    if(years) text += years + 'y ';
    if(months) text += months + 'm ';
    if(weeks) text += weeks + 'w ';
    if(days) text += days + 'd ';
    if(!text) text = hours + 'h';
  } else {
    if(years) text += ' Year ' + years;
    if(months) text += ' Month ' + months;
    if(weeks) text += ' Week ' + weeks;
    if(days) text += ' Day ' + days;
    text += ' Hour ' + hours;
  }
  return text.trim();
}

const PrettyAge = props => {
  return (<div className="PrettyAge">{makeAge(props.time, props.long)}</div>
  );
}

export default PrettyAge;