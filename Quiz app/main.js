// Elements selecting / variable declaration
let quizContainer = document.querySelector(".quiz-container");
let spanCount = document.querySelector(".quiz-info .count span");
let bulletContainer = document.querySelector(".spans");
let quizText = document.querySelector(".quiz-area");
let answers = document.querySelector(".answers-area");
let submit = document.querySelector(".submit");
let start = document.querySelector(".start");
let showResults = document.querySelector(".results");
let time = document.querySelector('.countdown');
let current = 0;
let right = 0;
let timer;
// Elements selecting and variable declaration
start.addEventListener("click", () => {
  questions();
  start.remove();
});
// getting questions from .json file (must use a local server)
function questions() {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let qsObject = JSON.parse(this.responseText);
      let count = qsObject.length;
      spanCount.innerHTML = count;
      // console.log(count)
      countDown(70, count);
      questionData(qsObject[current], count);
      createBullets(count);
      // everything triggers from here
      submit.onclick = (e) => {
        if (current < count) {
          checkAnswer(qsObject[current].correctAnswer, count);
          current++;
          activity(current);
          questionData(qsObject[current], count);
          clearInterval(timer);
          countDown(70, count);
        } else {
          clearInterval(timer);
          results(count);
        }
      };
    }
  };
  // everything triggers from here
  req.open(`GET`, `./qsObject.json`, true);
  req.send();
}
// getting questions from .json file (must use a local server)
function countDown(sDuration, count){
  if(current < count){
    let mins;
    let secs;
    mins = parseInt(Math.trunc(sDuration / 60));
    secs = parseInt(sDuration % 60);
    secs < 10 ? secs = `0${secs}` : secs;
    mins < 10 ? mins = `0${mins}` : mins;
    time.innerHTML = `${mins} : ${secs}`;
    timer = setInterval(() =>{
      secs--;
      secs < 10 ? secs = `0${secs}` : secs;
      time.innerHTML = `${mins} : ${secs}`;
      if(secs == 0 && mins > 0){
        mins--;
        mins < 10 ? mins = `0${mins}` : mins;
        secs = 59;
        time.innerHTML = `${mins} : ${secs}`;
      }else if(secs == 0 && mins == 0){
        clearInterval(timer);
        submit.click();
      }
    },100)  
  };
};
function activity(cur) {
  let bullets = document.querySelectorAll(".spans span");
  if (cur < bullets.length) {
    bullets[cur].className = "on";
  }
}
// creating bullets
function createBullets(num) {
  bulletContainer.innerHTML = "";
  for (let i = 0; i < num; i++) {
    let bullet = document.createElement("span");
    if (i === 0) {
      bullet.className = "on";
    }
    bulletContainer.appendChild(bullet);
  }
}
// creating bullets

// question data
function questionData(question, qcount) {
  if (current < qcount) {
    //creating question text
    quizText.innerHTML = "";
    let h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode(question.question));
    quizText.appendChild(h2);
    //creating question text

    answers.innerHTML = "";
    //creating answer element
    for (let i = 0; i < qcount; i++) {
      let answer = document.createElement("div");
      answer.className = "answer";
      let input = document.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("id", `a-${i + 1}`);
      input.setAttribute("name", "questions");
      if (i === 0) {
        input.setAttribute("checked", true);
      }
      answer.appendChild(input);
      let label = document.createElement("label");
      label.setAttribute("for", input.id);
      label.appendChild(document.createTextNode(question.answers[i]));
      answer.appendChild(label);
      answers.appendChild(answer);
    }
  }
  //creating answer element
}

// answer processing
function checkAnswer(correct, count) {
  // this approach is stupid and needs to be refactored using dataset on the input
  let options = document.querySelectorAll("input");
  let labels = document.querySelectorAll("input + label");
  // this approach is stupid and needs to be refactored using dataset on the input
  let selected;
  for (let i = 0; i < 4; i++) {
    if (options[i].checked === true) {
      selected = labels[i].innerHTML;
    }
  }
  if (selected === correct) {
    right++;
    console.log(`you selected the right answer`);
  } else {
    console.log(`you selected the wrong answer`);
  }
}
// answer processing

// Show results
function results(total) {
  answers.innerHTML = "";    
  quizText.innerHTML = "";
  // console.log(right);
  console.log(total);
  // console.log(`Correct answers ${right}`, `Wrong answers ${total - right}`);
  let displayResults = document.createElement("div");
  let rank = document.createElement("span");
  displayResults.className = "results";
  if (total / 2 > right) {
    rank.setAttribute("rank", "f");
    rank.innerText = `stupid`;
  } else if (total === right) {
    rank.setAttribute("rank", "s");
    rank.innerText = `perfect`;
  } else if (total / 2 < right) {
    rank.setAttribute("rank", "a");
    rank.innerText = `good`;
  }
  showResults.appendChild(rank);
}
// Show results
