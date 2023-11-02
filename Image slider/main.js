// Selecting elements and declaring variables
let slideNumber = document.querySelector('.slide-num span');
let bulletsContainer = document.querySelector('.bullets');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let slides = [...document.querySelectorAll('.images img')];
let slidesCount = slides.length;
let currentSlide = 1;
// Selecting elements and declaring variables

function prevSlide(){
  if(prev.classList.contains('disabled')){
    return;
  }
  activity(currentSlide - 1);
  currentSlide--;
  currentSlide < 1 ? currentSlide = 1 : currentSlide;
};

function nextSlide(){
  if(next.classList.contains('disabled')){
    return;
  }
  activity(currentSlide + 1);
  currentSlide++;
  currentSlide > slidesCount ? currentSlide = slidesCount : currentSlide;
};

function createBullets(num){
  for(let i = 0; i < num; i++){
    let span = document.createElement('span');
    span.className = 'bullet';
    if(i == 0){
      span.classList.add('active');
    }
    span.setAttribute("number", i+1);
    span.innerHTML = i+1;
    bulletsContainer.appendChild(span);
  }
}

function activity(num){
  num = parseInt(num);
  if(num === 1){
    next.classList.remove('disabled');
    prev.classList.add('disabled');
  }else if(num === slidesCount){
    prev.classList.remove('disabled');
    next.classList.add('disabled');
  }else{
    prev.classList.remove('disabled');
    next.classList.remove('disabled');
  }
  if(num > 0 && num <= slidesCount){
    // slide number update
    slideNumber.innerHTML = num;
    // slide number update
    // bullets activity
    let bullets = [...document.querySelectorAll('.bullets span')];
    bullets.forEach(bullet => {
      bullet.classList.remove("active");
    });
    bullets[num - 1].classList.add("active");
    // bullets activity
    // slides activity
    slides.forEach(
      slide => {
        slide.classList.remove('active');
      }
      );
    slides[num - 1].classList.add('active');
    // slides activity
  }
}

createBullets(slidesCount);
activity(currentSlide);
bulletsContainer.addEventListener("click", b => {
  currentSlide = parseInt(b.target.innerHTML);
  activity(b.target.innerHTML)
})
prev.addEventListener("click", prevSlide);
next.addEventListener("click", nextSlide);
