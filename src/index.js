let addToy = false;
const toyURL = 'http://localhost:3000/toys'


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


fetch(toyURL)
.then((response)=>response.json())
.then((o)=> display(o))

function display(object){
  const toyDisplay = document.getElementById('toy-collection')
  object.forEach(function (toy){
    const toyCard = document.createElement('div')
    toyCard.setAttribute('class','card')
    toyCard.innerHTML = `
    <h2>${toy['name']}</h2>
    <img src="${toy['image']}" class="toy-avatar" />
    <p>${toy['likes']}</p>
    <button class="like-btn" id="${toy['id']}">Like ❤️</button>
    `
    toyDisplay.append(toyCard)
    const likeButton = document.getElementById(`${toy['id']}`).addEventListener("click", function(){
    const p = toyCard.querySelector('p')
    p.innerText++
    fetch(`${toyURL}/${toy['id']}`,{
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes":parseInt(p.innerText),
      })
    })
    })
  })
}

const sendObj = {
  headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },

  body: JSON.stringify({
    "name": "Jessie",
    "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
    "likes": 0
  })
}

const form = document.querySelector('.add-toy-form').addEventListener('submit', (e)=>{
  e.preventDefault()
  const nameAdd = e.target.name.value
  const imageAdd = e.target.image.value
  const likes = 0

  fetch(toyURL,  submiting = {
    method: "POST",
    headers:{
    "Content-Type": "application/json",
    Accept: "application/json"
    },
    body: JSON.stringify({
      "name": nameAdd,
      "image": imageAdd,
      "likes": likes
    })
  })
  .then((response)=>response.json())
  .then((o)=> renderNew(o))
})

function renderNew(o){
  const newToy = o
  const toyDisplay = document.getElementById('toy-collection')
  const toyCard = document.createElement('div')
  toyCard.setAttribute('class','card')
  toyCard.innerHTML = `
  <h2>${newToy['name']}</h2>
  <img src="${newToy['image']}" class="toy-avatar" />
  <p>${newToy['likes']}</p>
  <button class="like-btn" id="${newToy['id']}">Like ❤️</button>
  `
  toyDisplay.append(toyCard)
  const likeButton = document.getElementById(`${newToy['id']}`).addEventListener('click', function(){
    const p = toyCard.querySelector('p')
    p.innerText++
    fetch(`${toyURL}/${newToy['id']}`,{
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes":parseInt(p.innerText),
      })
    })
  })
  
}
