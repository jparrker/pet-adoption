const template = document.querySelector("#pet-card-template")
const wrapper = document.createDocumentFragment()

async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
  const weatherData = await weatherPromise.json()
  const ourTemperature = weatherData.properties.periods[0].temperature
  document.querySelector('#temperature-output').textContent = ourTemperature
}

function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear()
  const age = currentYear - birthYear
  if (age === 1) return "1 year old"
  if (age === 0) return 'Less than a year old'

  return `${age} years old`

}
async function petsArea() {
  const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
  const petsData = await petsPromise.json()
  petsData.forEach(pet => {
    const clone = template.content.cloneNode(true)
    clone.querySelector("h3").textContent = pet.name
    clone.querySelector(".pet-description").textContent = pet.description
    clone.querySelector(".pet-card").dataset.species = pet.species
    clone.querySelector('.pet-age').textContent = createAgeText(pet.birthYear)
    if (!pet.photo) pet.photo = "./images/fallback.jpg"
    clone.querySelector('.pet-card-photo img').src = pet.photo
    wrapper.appendChild(clone)
  });
  document.querySelector(".list-of-pets").appendChild(wrapper) //only update the DOM once. 
}

const allButtons = document.querySelectorAll(".pet-filter button")
allButtons.forEach((element) => {
  element.addEventListener("click", handleButtonClick)
})

function handleButtonClick(e) {

  // remove active class from all buttons
  allButtons.forEach(el => el.classList.remove("active"))

  // add active class to clicked button
  e.target.classList.add("active")
  // filter pets
  const currentFilter = e.target.dataset.filter

  document.querySelectorAll(".pet-card").forEach((el) => {
    if (currentFilter == el.dataset.species || currentFilter == 'all') {
      el.style.display = 'grid'
    } else {
      el.style.display = 'none'
    }
  })
}

// pet filter






start()
petsArea()