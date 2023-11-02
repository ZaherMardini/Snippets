// Elements selection
let nameError = document.querySelector('.name-error');
let messageError = document.querySelector('.message-error');
let numberError = document.querySelector('.number-error');
let emailError = document.querySelector('.email-error');
let errors = Array.from(document.querySelectorAll('span'));
let name = document.getElementById(`name`);
let inputs = document.querySelectorAll(`input`);
let message = document.getElementById(`message`);
let messageInfo = document.querySelector(`.message-info`);
let submit = document.querySelector(`[type = "submit"]`);
let fix = document.querySelector(`.submit-error`);
let shield = document.querySelector(`.shield`);
let nch, noch, ech, mch;
nch = noch = ech = mch = false;
// Elements selection

// Setting validation on each input field
inputs.forEach(input => {
  input.addEventListener(`keyup`, validation);
});
message.addEventListener(`keyup`, validation);
// Setting validation on each input field

function validation(){
  if(this.id === `name`){
    nch = false;
    let validName = (/^([a-z]\s?){2,}$/i).test(this.value);
    if(!this.value.length){
      nameError.innerHTML = `name is required`;
      nameError.style.display = `block`;
      shake(nameError);
    }else if(!validName){
      nameError.innerHTML = `name is not valid`;
      nameError.style.display = `block`;
      shake(nameError);
    }else{
      nameError.style.display = `none`;
      nch = true;
      return true;
    }
  }else if(this.id === `number`){
    noch = false;
    let validNumber = (/^\+(\d{3}(\s)?){4}$/).test(this.value);
    if(!this.value.length){
      numberError.innerHTML = `number is required`;
      numberError.style.display = `block`;
      shake(numberError);
    }else if(this.value.length < 16){
      numberError.innerHTML = `number should be of 16 digits and starts with +`;
      numberError.style.display = `block`;
      shake(numberError);
    }
    else if(!validNumber){
      numberError.innerHTML = `only digits`;
      numberError.style.display = `block`;
      shake(numberError);
    }else{
      numberError.style.display = `none`;
      noch = true;
      return true;
    }
  }else if(this.id === `email`){
    ech = false;
    let validemail = (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(this.value);// from chatGpt you cheater
    if(!this.value.length){
      emailError.innerHTML = `email is required`;
      emailError.style.display = `block`;
      shake(emailError);
    }else if(!validemail){
      emailError.innerHTML = `email is not valid`;
      emailError.style.display = `block`;
      shake(emailError);
    }else{
      emailError.style.display = `none`;
      ech = true;
      return true;
    }
  }else if(this.id === `message`){
    mch = false;
    let charNum = message.value.length;
    let req = 10;
    let left;
    left = req - charNum;
    if(left > 0){
      messageInfo.innerHTML = `${left} characters required`;
      messageInfo.style.display = `block`;
      return;
    }
    messageInfo.style.display = `none`;
    mch = true;
    return true;
  }
  //final check
}
setInterval(() => {
  if(!check()){
    console.log(`working`)
    youShallNotSend(submit);
  }
}, 5000);
submit.onclick = (e) => {
  check() ? true : e.preventDefault();
}

function check(){
  let checks = [nch, noch, ech, mch];
  let val = checks.filter((check)=> {
    return check === true;
  }).length;
  if(val === errors.length - 1){
    submit.value = `send`;
    submit.style.backgroundColor = `black`;
    submit.onmousemove = null;
    submit.onclick = true;
    fix.style.display = `none`;
    return true;
  }else{
    shake(fix);
    fix.style.display = `block`;
    return false;
  }
  
}
function shake(element){
  element.classList.add(`shake`);
  setTimeout(() => {
  element.classList.remove(`shake`);
  }, 500);
}


function youShallNotSend(box){
  submit.value = `Error`;
  submit.style.backgroundColor = `red`;
  box.onclick = (e) => {e.preventDefault()};
  box.onmousemove = (e)=>{
    let dx = e.pageX;
    let dy = e.pageY;
    let bpos = box.getBoundingClientRect();
    let x = dx - bpos.x;
    let y = dy - bpos.y;
    let width = bpos.width;
    let height = bpos.height;
    box.style.transform = `translate(${x < width/2 ? width : -width}px)`;
    // back to the previous position
    setTimeout(()=>{
      box.style.transform = `none`;
    }
    ,5000);
  }
}