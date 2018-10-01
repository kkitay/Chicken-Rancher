function PrettyAge(hours, long = false) {
  let text = '';
  let days = Math.floor(hours / 24);
  let weeks = Math.floor(days / 7);
  let months = Math.floor(weeks / 4);
  let years = Math.floor(months / 12);
  let remainingMonths = months - years * 12;
  let remainingWeeks = weeks - remainingMonths * 4;
  let remainingDays = days - remainingWeeks * 7;
  let remainingHours = hours - remainingMonths * 4 * 7 * 24 - remainingWeeks * 7 * 24 - remainingDays * 24;

  if(long === false) {
    if(years) text += years + 'y ';
    if(remainingMonths) text += remainingMonths + 'm ';
    if(remainingWeeks) text += remainingWeeks + 'w ';
    if(remainingDays) text += remainingDays + 'd ';
    if(!text) text = remainingHours + 'h';
  } else {
    if(years) text += ' Year ' + years;
    if(remainingMonths) text += ' Month ' + remainingMonths;
    if(remainingWeeks) text += ' Week ' + remainingWeeks;
    if(remainingDays) text += ' Day ' + remainingDays;
    text += ' Hour ' + remainingHours;
  }
  return text.trim();
}

module.exports = PrettyAge;