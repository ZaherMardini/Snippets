// selecting elements and declaring variables
let lettersContainer = document.querySelector('.letters');
let category = document.querySelector('.category span');
let pad = document.querySelector('.letters-guess');
let drawing = document.querySelector('.hangedman-drawing')
const l = "abcdefghijklmnopqrstuvwxyz";
let letters = [...l];
const words = {
  physics: [
    "quantum physics",
    "relativity theory",
    "particle",
    "energy",
    "wave",
    "gravity"
  ],
  chemistry: [
    "molecule",
    "consecutive reaction",
    "catalyst",
    "base acid",
    "base"
  ],
  biology: [
    "red blood cell",
    "DNA",
    "gene",
    "evolution",
    "species"
  ],
  astronomy: [
    "galaxy",
    "planet",
    "star",
    "nebula",
    "black hole",
    "zaher"
  ]
};
// selecting elements and declaring variables

function genLetters(){
  letters.forEach((letter) => {
    let span = document.createElement('span');
    span.appendChild(document.createTextNode(letter));
    span.className = 'letter-box';
    lettersContainer.appendChild(span);
  });
};
// function genWords(){
  // random number in range of [0 - keys number]
  let randomOnKey =  Math.trunc(Math.random() * Object.keys(words).length);
  // random number in range of [0 - keys number]

  // Array of keys
  let keys = Object.keys(words);
  // Array of keys

  let randomKeyName = keys[randomOnKey];
  let randomPropValue = words[randomKeyName];
  let randomOnPropLength = Math.trunc(Math.random() * randomPropValue.length);
  let randomWord = randomPropValue[randomOnPropLength];
  let randomWordArray = [...randomWord];
  category.innerHTML = randomKeyName;

// }
// function setWord(){
  randomWordArray.map((l) => {
    let bracket = document.createElement('span');
    bracket.className = 'bracket';
    if(l === " "){
      bracket.classList.add('space');
    }
    pad.appendChild(bracket);
  })
// }
let selected = [];
let wrong = 0;
let right = 0;
document.addEventListener('click', (e) => {
  let answer = false;
  if(e.target.classList.contains("letter-box")){
    e.target.classList.add("clicked");
    let clicked = e.target.innerHTML;
    randomWordArray.map((ltr,index) => {
      if(ltr === clicked){
        answer = true;
        console.log(`${clicked} is found at index:${index} in ${randomWord}`);
        insertLetters(clicked, index)
        right++;
      }
    });
    // handling answers
    if(answer !== true){
      wrong++;
      drawing.classList.add(`wrong-${wrong}`);
      if(wrong >= 5){
        drawing.classList.add(`man`)
      }
    }else{
      document.getElementById('success').play();
    }
    if(wrong === 8){
      lettersContainer.classList.add('finished');
      endGame();
    }
    if(right === randomWord.length){
      lettersContainer.classList.add('finished');
      endGame();
    }
    // handling answers
  }
})
function insertLetters (letter, index){
  let brackets = document.querySelectorAll('.letters-guess span');
  brackets.forEach(() => {
    brackets[index].innerHTML = letter;
  });
}
function endGame(){
  let mes = document.createElement('div');
  mes.className = 'end';
  if(wrong === 8){
    mes.appendChild(document.createTextNode(`Game over loser, the word is "${randomWord}"`));
  }else{
    mes.appendChild(document.createTextNode(`You win, the word is "${randomWord}"`));
  }
  pad.innerHTML = '';
  pad.appendChild(mes);
}
genLetters();