function PrettyAge(hours, long = false) {
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
  
  /*let days = Math.floor(hours / 24);
  let weeks = Math.floor(days / 7);
  let months = Math.floor(weeks / 4);
  let years = Math.floor(months / 12);
  let remainingMonths = months - years * 12;
  let remainingWeeks = weeks - remainingMonths * 4;
  let remainingDays = days - remainingWeeks * 7;
*/
  //let remainingHours = hours - (years * 12 * 4 * 7 * 24) - (remainingMonths * 4 * 7 * 24) - (remainingWeeks * 7 * 24) - (remainingDays * 24);
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

module.exports = PrettyAge;