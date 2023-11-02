let input = document.querySelector(".input");
let button = document.querySelector(".button");
let tasks = document.querySelector(".tasks");
//=====================Task Addition functionality=====================
//Event listener
button.onclick = function() {
  if(input.value !== ""){
    addTaskToArray(input.value);
    input.value = "";
  }
}
//Resetting the tasks array
let result = [];
//If there is any data in the local storage assign them to the tasks array
if(window.localStorage.getItem(`tasksArray`)){
  result = JSON.parse(window.localStorage.getItem(`tasksArray`));
  createTaskElement(JSON.parse(window.localStorage.getItem("tasksArray")));
}
// note that the task is represented as an object
function addTaskToArray(input){
  let task = {
    id: Date.now(),
    title: input,
    done: false
  }
  result.push(task);
  createTaskElement(result);
  toLocalStorage(result);
}
//Adding Tasks to array first then we create the task element with seperate functions  
function createTaskElement(result = ""){
  tasks.innerHTML = "";
  result.forEach(task => {
//Task Element
    let div = document.createElement("div");
    div.setAttribute("class", "task");
    div.setAttribute("date", task.id);
    if(task.done === true){
      div.classList.add("done");
    }
    div.appendChild(document.createTextNode(task.title));
//Delete button
    let dlt = document.createElement("span");
    dlt.setAttribute("class", "f-center del");
    dlt.appendChild(document.createTextNode("Delete"));
//Task & button Element
    div.appendChild(dlt);
    tasks.appendChild(div);
  })
}
function toLocalStorage(tasksArray){
  window.localStorage.setItem("tasksArray",JSON.stringify(tasksArray));
}
//=====================Task Addition functionality=====================

//=====================Task Deletion functionality=====================
tasks.addEventListener("click", function(e){
  if(e.target.classList.contains("del")){
    removeTask(e);
  }
  if(e.target.classList.contains("task")){
    e.target.classList.toggle("done");
    updateTaskLocal(e.target.getAttribute("date"));
  }
});
function removeTask(e){
    removeFromLocal(e.target.parentElement.getAttribute("date"));
    e.target.parentElement.remove();
  }

function removeFromLocal(taskId){
  result.map(function (obj) {
    if(+obj.id === +taskId){
        result.splice(result.indexOf(obj),1);
        toLocalStorage(result);
    }
})
}
//=====================Task Deletion functionality=====================


function updateTaskLocal(taskId){
  console.log(result);
  result.map(obj => {
    if(+obj.id === +taskId){
      obj.done = !obj.done;
    }
  });
  toLocalStorage(result);
}