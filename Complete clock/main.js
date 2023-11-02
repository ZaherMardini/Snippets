let timerSwitch;
let clockSwitch;
let stopWatchSwitch;
let startButton = document.querySelector(`.button`);
let inputs = document.querySelectorAll(`input`);
let select = document.querySelector(`select`);
let controls = document.querySelectorAll(`.controls`);


function timer(){
  let hours = +document.getElementById(`hours`).value;
  let minutes = +document.getElementById(`minutes`).value;
  let seconds = +document.getElementById(`seconds`).value;
  if(hours === 0 && minutes === 0 && seconds === 0){
    console.log(`Time's up`);
    clearInterval(timerSwitch);
    return;
  }
  seconds--;
  if(seconds < 0 && minutes >= 0){
    seconds = 59;
    minutes--;
    if(minutes < 0 && hours >= 0){
      minutes = 59;
      hours--;
      if(hours < 0){ 
        hours = 0;
          }
        }
      }
      seconds < 10 ? seconds = `0${seconds}` : seconds;
      minutes < 10 ? minutes = `0${minutes}` : minutes;
      hours < 10 ? hours = `0${hours}` : hours;
      document.getElementById(`seconds`).value = seconds;
      document.getElementById(`minutes`).value = minutes;
      document.getElementById(`hours`).value = hours;
    }
    
    
    function clock(){
      let date = new Date();
      let h = (date.getHours() < 10 ? `0` : ``) + date.getHours();
      let m = (date.getMinutes() < 10 ? `0` : ``) + date.getMinutes();
      let s = (date.getSeconds() < 10 ? `0` : ``) + date.getSeconds();
      document.getElementById(`hours`).value = h;
      document.getElementById(`minutes`).value = m;
      document.getElementById(`seconds`).value = s;
    }
    
    
    function stopWatch(){
      let hours = +document.getElementById(`hours`).value;
      let minutes = +document.getElementById(`minutes`).value;
      let seconds = +document.getElementById(`seconds`).value;
      seconds++;
      if(seconds > 59){
        seconds = 59;
        minutes++;
        if(minutes > 59){
          minutes = 59;
          hours++;
        }
      }
      seconds < 10 ? seconds = `0${seconds}` : seconds;
      minutes < 10 ? minutes = `0${minutes}` : minutes;
      hours < 10 ? hours = `0${hours}` : hours;
      document.getElementById(`seconds`).value = seconds;
      document.getElementById(`minutes`).value = minutes;
      document.getElementById(`hours`).value = hours;
}
function startClock(){
  clockSwitch = setInterval(clock, 1000);
}
function stopClock(){
  clearInterval(clockSwitch);
}
function startTimer(){
  timerSwitch = setInterval(timer, 1000);
}
function stopAll(){
  clearInterval(timerSwitch);
  clearInterval(clockSwitch);
  clearInterval(stopWatchSwitch);
  inputs.forEach(input => { input.value = `00`})
}
function pauseTimer(){
  clearInterval(timerSwitch);
}
function startStopWatch(){
  stopWatchSwitch = setInterval(stopWatch, 1000);
}
function pauseStopWatch(){
  clearInterval(stopWatchSwitch);
}
function mode(){
  controls.forEach(control => {
    control.style.display = `none`;
    if(control.getAttribute(`mode`) === select.value){
      control.style.display = `flex`;
    }
  })
}
