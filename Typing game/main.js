// Catching elements
let record = document.querySelector(".record");
let play = document.querySelector(".play");
let lvl = document.querySelector(".level");
let time = document.querySelector(".time span");
let currentWord = document.querySelector(".current-word");
let upcommingWords = document.querySelector(".upcomming-words");
let input = document.querySelector("input");
let score = document.querySelector(".score");
let totalScore = document.querySelector("#total");
let currentScore = document.querySelector("#current");
let finish = document.querySelector(".finish");
// Catching elements
// Display record
viewRecord();

// Setting levels
let words = [
  "zaher",
  "raiden",
  // "zote",
  // "paralysis",
  // "qustentine",
  // "expendables",
  // "gojo",
  // "smigol",
  // "beekshise",
  // "goremjo",
  // "jamoos",
  // "S-note",
  // "L",
  // "nier",
  // "raziel",
  // "itshigo",
  // "youhabaha",
  // "bertholto",
  // "rica",
  // "eroen",
  // "eren",
  // "vito-scalete",
  // "joe"
];

const lvls = {
baby: 10,
rooky: 5,
warrior: 4,
veteran: 2
};
// Important note is the event listentr for real time changing 
time.innerHTML = lvls[lvl.value];
lvl.addEventListener("change", ()=>{
  time.innerHTML = lvls[lvl.value];
})
// Setting levels

// score setting
currentScore.innerHTML = 0;
let scoring = 0;
totalScore.innerHTML = words.length;
// paste disabling 
input.onpaste = function(){return false};
// game main mechanics
play.onclick = function(){
  play.remove();
  input.focus();
  genWords();
}
function genWords(){
  // generating the current word
  let randomWord = words[Math.floor(Math.random()*words.length)];
  let randomWordIndex = words.indexOf(randomWord);
  //updating the words array when the word is written
  words.splice(randomWordIndex,1);
  //updating the upcomming words div to add new ones
  upcommingWords.innerHTML = "";
  for(let i = 0; i < words.length; i++){
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(words[i]));
    upcommingWords.appendChild(span);
  }
  currentWord.innerHTML = randomWord;
  starting();
}
function starting(){
  record.remove();
  let start = setInterval(()=>{
    time.innerHTML--;
    if(time.innerHTML == 0){
      clearInterval(start);
      if(currentWord.innerText === input.value){
        scoring+=1;
        currentScore.innerHTML = scoring;
        input.value = "";
        time.innerHTML = lvls[lvl.value];
        if(upcommingWords.innerHTML === ""){
          finish.innerHTML = "You win";
          let record = `${currentScore.innerHTML}, Date: ${Date()}`;
          saveRecord(record);
          return;
        }
        genWords();
      }
      else{
        finish.innerHTML = `game over`;
        replay();
      }
    }
  },1000);
}
// Saving Record with the date of completion
function saveRecord(score){
  window.localStorage.setItem('score', score);
}
function viewRecord(){
  if(window.localStorage.getItem(`score`)){
    record.innerHTML = `Your last score is ${window.localStorage.getItem(`score`)}`;
  }else{
    record.innerHTML = `You don't have any record`;
  }
}
function replay(){
  let tryAgain = document.createElement("button");
  tryAgain.innerHTML = `replay`;
  tryAgain.setAttribute("class","replay");
  finish.appendChild(tryAgain);
  tryAgain.addEventListener("click", ()=>{tryAgain.remove(); time.innerHTML = lvls[lvl.value]; input.value = ""; genWords()});
}