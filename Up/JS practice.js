let up = document.querySelector(".up");
window.onscroll = function(){
  this.scrollY > 1500 ? up.classList.add("show") : up.classList.remove("show");
}
up.addEventListener("click", function(){
  window.scrollTo({
  top:0,
  behavior:"smooth"
  })
})