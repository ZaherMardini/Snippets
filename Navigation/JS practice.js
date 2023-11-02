let lis = document.querySelectorAll("nav ul li");
let imgs = [...document.images];
lis.forEach((li) => {
  li.addEventListener("click", activate);
  li.addEventListener("click", manageImages);
})
function activate () {
  lis.forEach(li => {
    li.classList.remove("active");
    this.classList.add("active");
  })
}
function manageImages(){
  imgs.map(img => {img.style.display = "none"; });
  document.querySelectorAll(this.dataset.cat).forEach(li => li.style.display = "inline");
}