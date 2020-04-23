// Konstanter för knappar
const prevBtn = document.querySelector("button.prev")
const nextBtn = document.querySelector("button.next")


// Lokal data
let localPeopleStorage = []
let localPlanetStorage = []

const personPrototype = document.querySelector(".person.prototype")
const planetProtoype = document.querySelector(".planet.prototype")
const planetContainer = document.querySelector("aside")
const personList = document.querySelector(".person-list")

let currentPage = 1
let mainPageURL = "http://swapi.dev/api/people/";
let nextPageURL;
let prevPageURL;

//Listeners
nextBtn.addEventListener("click", function () {
    loadPeople(nextPageURL)
});

prevBtn.addEventListener("click", function () {
    loadPeople(prevPageURL)
});

//Funktioner
function loadPeople(pageURL) {
    fetch(pageURL)
        .then(resp => resp.json())
        .then(data => {
            localPeopleStorage = data.results
            nextPageURL = data.next
            prevPageURL = data.previous
            renderPeople(localPeopleStorage, personList)
        })
}

function loadPlanet(pageURL, planetContainer) {
    fetch(pageURL)
        .then(resp => resp.json())
        .then(data => {
            localPlanetStorage = data
            renderPlanet(localPlanetStorage, planetContainer)
        })
}

loadPeople(mainPageURL)

function renderPeople(people, container) {
    container.innerHTML=""
    for(let i = 0; i < people.length;i++){
        let newPerson = personPrototype.cloneNode(true)
        newPerson.classList.remove("prototype")
        newPerson.innerHTML = people[i].name
        newPerson.addEventListener("click", (event) => {
            // loadPlanet(event.target.homeworld, planetContainer)
            loadPlanet(people[i].homeworld, planetContainer)
        })
        
        container.append(newPerson)
    }
}

function renderPlanet(planet, container) {
    container.innerHTML = ""
    let currentPlanet = planetProtoype.cloneNode(true)
    currentPlanet.classList.remove("prototype")
    currentPlanet.querySelector("p.name").innerHTML = `Name: ${planet.name}`
    currentPlanet.querySelector("p.diameter").innerHTML = `Diameter: ${planet.diameter}`
    currentPlanet.querySelector("p.climate").innerHTML = `Climate: ${planet.climate}`
    currentPlanet.querySelector("p.terrain").innerHTML = `Terrain: ${planet.terrain}`
    currentPlanet.querySelector("p.population").innerHTML = `Population: ${planet.population}`
    
    container.append(currentPlanet)
    
}



// function Person (PersonData) {
//     return `
//         <li class="character">
//             <h1 class="title">${postData.title}</h1>
//             <p class="author">${postData.author}</p>
//             <p class="content">${postData.content}</p>
//             <button class="delete">DELETE</button>
//         </article>
    // `