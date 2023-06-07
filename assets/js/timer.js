const departMinutes = 5 // 5 minutes de timer
var temps = departMinutes * 60 // * 60 pour mettre en secondes

const timer = document.getElementById("timer")

var minutes = parseInt(temps / 60, 10)
var secondes = parseInt(temps % 60, 10)

export function start(){

  start.addEventListener("click", setInterval(() => {
    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes
  
    timer.innerText = `${minutes}:${secondes}` // Affichage en HTML
    temps = temps <= 0 ? 0 : temps - 1
  }
  , 1000))
}
