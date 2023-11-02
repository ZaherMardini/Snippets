// selecting elements and declaring variables
let container = document.querySelector('.container');
let zevent = document.querySelector('.event');
let days, hours, minutes, seconds, difference;
// selecting elements and declaring variables

function mySadBirthDay(){
  difference = new Date(`Feb 08, 2025 23:59:59 `).getTime() - new Date().getTime();
  days = Math.trunc(difference / (1000 * 60 * 60 * 24));
  hours = Math.trunc((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes = Math.trunc(difference % (1000 * 60 * 60) / (1000 * 60));
  seconds = Math.trunc((difference % (1000 * 60)) / (1000));
  hours < 10 ? hours = `0${hours}` : hours;
  minutes < 10 ? minutes = `0${minutes}` : minutes;
  seconds < 10 ? seconds = `0${seconds}` : seconds;
  if(difference == 0){
    clearInterval(event);
    zevent.innerHTML = `where should we go now?`;
  }
  zevent.innerHTML = `${days}D || ${hours}H || ${minutes}M || ${seconds}S`
  let event = setInterval(mySadBirthDay, 1000);
}
