// Selectors
const playerCar = document.getElementById("player-car");
const message = document.getElementsByClassName("message")[0];
const gameContainer = document.getElementsByClassName("game-container")[0];
const randomCars = document.querySelectorAll(".random-car");
let playerCar_left = 0;
let rightTime;
let leftTime;
let cars = [];
let stopInterval;
let randomCars_top = 0;
const carImages = ["random-car-1.svg", "random-car-2.png", "random-car-3.svg"];
// setInterval(() => {
//   randomCars.forEach((car) => {
//     randomCars_top += 0.5;
//     car.style.top = randomCars_top + "px";
//   });
// }, 30);

// Event handlers
document.addEventListener("keydown", startGame);

// Functions
function startGame(e) {
  if (e.key === "Enter") {
    playerCar.style.display = "block";
    playerCar_left = 320;
    playerCar.style.left = playerCar_left + "px";
    console.log(playerCar_left);
    message.innerHTML = "";
    createCars();
    carControl();
    stopMoving();
  }
}
randomId = () => {
  return Math.floor(Math.random() * 3);
};
function createCars() {
  for (let i = 1; i < 5; i++) {
    let car = document.createElement("img");
    let carObj = {};
    switch (i) {
      case 1:
        carObj.left = 90;
        break;
      case 2:
        carObj.left = 240;
        break;
      case 3:
        carObj.left = 400;
        break;
      case 4:
        carObj.left = 570;
        break;
      default:
        carObj.left = 0;
    }
    car.classList.add("random-car");
    car.src = carImages[randomId()];
    car.style.left = carObj.left + "px";
    carObj.top = 0;
    carObj.car = car;
    cars.push(carObj);
    gameContainer.appendChild(car);
  }
}
function carControl() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      moveRight();
    } else if (e.key === "ArrowLeft") {
      moveLeft();
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      clearInterval(rightTime);
      clearInterval(leftTime);
    }
  });
}

function moveRight(e) {
  clearInterval(leftTime);
  clearInterval(rightTime);

  rightTime = setInterval(() => {
    playerCar_left += 10;
    playerCar.style.left = playerCar_left + "px";
  }, 30);
}
function moveLeft(e) {
  clearInterval(leftTime);
  clearInterval(rightTime);

  leftTime = setInterval(() => {
    playerCar_left -= 10;
    playerCar.style.left = playerCar_left + "px";
  }, 30);
}
function stopMoving(e) {
  stopInterval = setInterval(() => {
    if (playerCar_left < 0 || playerCar_left > 650) {
      console.log("Game ended");
      clearInterval(leftTime);
      clearInterval(rightTime);
    }
  });
}
