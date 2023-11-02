// Selecting elements and declaring variables 
let play = document.querySelector('.start span');
let blocksContainer = document.querySelector('.blocks');
let success = document.querySelector('audio')
let blocks = [...blocksContainer.children];
let range = [...Array(blocks.length).keys()];
let wrong = 0;
let win = [];
// Selecting elements and declaring variables 

play.addEventListener("click",startGame);

function startGame(){
  let name = prompt(`what is your name, huh?`);
  if(name == "" || name == null){
    document.querySelector('.game-info .name span').innerHTML = 'unknown';
  }else{
    document.querySelector('.game-info .name span').innerHTML = name;
  }
  document.querySelector('.start').remove();
  shuffle(range);
  flipAll();
  setTimeout(flipAll, 5000);
  flipBlock();
}

function shuffle(ref = [1,2,3]){ // the main idea is SWAPPING between a specific element and random element of the same array
  let current = ref.length;
  let random, temp;
  while(current > 0){
    random = Math.trunc(Math.random() * current);
    current--;
    temp = ref[current];
    ref[current] = ref[random];
    ref[random] = temp;
  };
  blocks.forEach((block, index) => {
    block.style.order = ref[index];
  })
};

function flipAll(){
  blocks.forEach(block => {block.classList.toggle('flip')});
};

function flipBlock(){
  blocksContainer.addEventListener("click", (e) => {
    let flipped = [];
    if(e.target.classList.contains('front')){
      e.target.parentElement.classList.add('flip');
      flipped = blocks.filter(block => block.classList.contains("flip"));
      if(flipped.length === 2){
        matching(flipped);
        pauseResume();
        setTimeout(pauseResume, 700);
      }
      // Winning case
      winCheck();
      // Winning case
    }
  });
}

function matching(flipped){
  if(flipped[0].getAttribute("tech") === flipped[1].getAttribute("tech")){
    flipped[0].classList.remove("flip");
    flipped[1].classList.remove("flip");     
    flipped[0].classList.add("matched");
    flipped[1].classList.add("matched");   
    success.play();
  }else{
    setTimeout(() => {
      flipped[0].classList.remove("flip");
      flipped[1].classList.remove("flip");      
    }, 700);
    wrong++;
    document.querySelector('.game-info .tries span').innerHTML = wrong;
  };
}
function pauseResume(){
    document.querySelectorAll('.front').forEach(front => {front.classList.toggle('stop')});
}

function winCheck(){
  win = blocks.filter(block => block.classList.contains('matched'));
  if(win.length === blocks.length){
    console.log(`You win`);
  }
}