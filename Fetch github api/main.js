// Cathing elements 

let input = document.querySelector("input");
let button = document.querySelector("button");
let showData = document.querySelector(".show-data");

button.addEventListener("click", getRepos);
function getRepos(){
  if(input.value === ''){
    showData.innerHTML = 'please type a github user name';
  }else{
    //fetching data
    let repos = fetch(`https://api.github.com/users/${input.value}/repos`);
    repos.then(response => response.json())
    //fetching data
    .then(data => {
    showData.innerHTML = '';
    //looping on data
    data.map(repo => {
    let dataDiv = document.createElement("div");
    //creating the anchor element
    let url = document.createElement("a");
    dataDiv.appendChild(document.createTextNode(repo.name));
    //setting the url and the innerhtml for the the anchor dynamically
    url.href = `https://github.com/${input.value}/${repo.name}`;
    url.innerHTML = 'visit';
    url.target = 'blank';
    let stars = document.createElement('span');
    stars.innerHTML = `Stars:${repo.stargazers_count}`;
    stars.className = 'stars';
    let opt = document.createElement('span');
    opt.className = 'opt';
    opt.appendChild(stars);
    opt.appendChild(url);
    dataDiv.appendChild(opt);
    showData.appendChild(dataDiv);
  })
});
  }
}