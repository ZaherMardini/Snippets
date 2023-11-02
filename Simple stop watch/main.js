// selecting elements and declaring variables
let container = document.querySelector('.container');
let zevent = document.querySelector('.event');
let hours, minutes, seconds;
// selecting elements and declaring variables

function start(h){
  hours = Math.trunc(h);
  minutes = Math.trunc((h - hours) * 60);
  seconds = 0;
  hours < 10 ? hours = `0${hours}` : hours;
  minutes < 10 ? minutes = `0${minutes}` : minutes;
  seconds < 10 ? seconds = `0${seconds}` : seconds;
  let eventTime = setInterval(timer,1);
  
  function timer(){
    seconds--;
    if(seconds < 0 && minutes >= 0){
      minutes--;
      if(minutes < 0 && hours > 0){
        hours--;
        hours < 10 ? hours = `0${hours}` : hours;
        minutes = 59;
      }
      minutes < 10 ? minutes = `0${minutes}` : minutes;
      seconds = 59;
    }
    if(seconds == 0 && minutes == 0 && hours == 0){
      clearInterval(eventTime);
    };
    seconds < 10 ? seconds = `0${seconds}` : seconds;
    zevent.innerHTML = `${hours} : ${minutes} : ${seconds}`;
  }
}