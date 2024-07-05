// Selectors
const playerCar = document.getElementById("player-car");
const message = document.getElementsByClassName("message")[0];
const gameContainer = document.getElementsByClassName("game-container")[0];
const randomCars = document.querySelectorAll(".random-car");
const road = document.querySelectorAll(".road");
const scoreBoard = document.getElementsByClassName("score-value")[0];
let roadArray = [];
let road_top = 0;
let playerCar_left = 0;
let playerCar_top = 0;
let rightTime;
let leftTime;
let moveCarsTime;
let moveCoinsTime;
let moveRoadsTime;
let createCarsTime;
let createCoinsTime;
let cars = [];
let coinArray = [];
let score = 0;
let stopInterval;
let randomCars_top = 0;
let isGameOver = false;
const carImages = ["random-car-1.svg", "random-car-2.png", "random-car-3.svg"];
const randomPositions = [
  [3, 2, 1, 4],
  [2, 1, 4, 3],
  [1, 3, 4, 2],
  [3, 4, 1, 2],
];

// Event handlers
document.addEventListener("keydown", startGame);

// Functions
createRoads();

function startGame(e) {
  if (e.key === "Enter" && !isGameOver) {
    playerCar.style.display = "block";
    playerCar_left = 320;
    playerCar_top = 490;
    playerCar.style.left = playerCar_left + "px";
    playerCar.style.top = playerCar_top + "px";
    message.innerHTML = "";
    moveRoads();
    createCars();
    carControl();
    moveCars();
    createCoins();
    moveCoins();
  }
}
randomId = (number) => {
  return Math.floor(Math.random() * 3);
};
function createRoads() {
  for (let i = 0; i < 2; i++) {
    let roadObj = {};
    if (i === 0) {
      roadObj.top = 0;
    } else {
      roadObj.top = -641;
    }
    road[i].style.top = roadObj.top + "px";
    roadObj.road = road[i];
    roadArray.push(roadObj);
  }
}
function moveRoads() {
  moveRoadsTime = setInterval(() => {
    roadArray.forEach((obj) => {
      obj.top += 5;
      obj.road.style.top = obj.top + "px";
    });
    roadArray.forEach((obj) => {
      if (obj.top >= 639) {
        obj.top = -641;
        obj.road.style.top = obj.top + "px";
      }
    });
  }, 30);
}
function createCars() {
  let i = 0;
  let j = 0;
  createCarsTime = setInterval(() => {
    if (!isGameOver) {
      if (i > 3) {
        j++;
        if (j > 3) {
          j = 0;
        }
        i = 0;
      }
      let car = document.createElement("img");
      let carObj = {};
      switch (randomPositions[j][i]) {
        case 1:
          carObj.left = 50;
          break;
        case 2:
          carObj.left = 220;
          break;
        case 3:
          carObj.left = 370;
          break;
        case 4:
          carObj.left = 550;
          break;
        default:
          carObj.left = 0;
      }
      car.classList.add("random-car");
      car.src = carImages[randomId()];
      if (car.src === "http://localhost:5500/random-car-2.png") {
        car.setAttribute("id", "random-car-2");
      }
      car.style.left = carObj.left + "px";
      carObj.top = -200 * i;
      car.style.top = carObj.top + "px";
      carObj.car = car;
      carObj.inScreen = false;
      cars.push(carObj);
      gameContainer.appendChild(car);
      i++;
    }
  }, 1800);
}
function createCoins() {
  let i = 0;
  let j = 0;
  createCoinsTime = setInterval(() => {
    if (!isGameOver) {
      if (i > 3) {
        j++;
        if (j > 3) {
          j = 0;
        }
        i = 0;
      }
      let coin = document.createElement("img");
      let coinObj = {};
      switch (randomPositions[j][i]) {
        case 1:
          coinObj.left = 120;
          break;
        case 2:
          coinObj.left = 270;
          break;
        case 3:
          coinObj.left = 430;
          break;
        case 4:
          coinObj.left = 600;
          break;
        default:
          coinObj.left = 0;
      }
      coin.classList.add("gold-coin");
      coin.src = "goldCoin1.png";
      coin.style.left = coinObj.left + "px";
      coinObj.top = -30 * i;
      coin.style.top = coinObj.top + "px";
      coinObj.coin = coin;
      coinObj.score = 1;
      coinArray.push(coinObj);
      gameContainer.appendChild(coin);
      i++;
    }
  }, 1800);
}
function carControl() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && !isGameOver) {
      moveRight();
    } else if (e.key === "ArrowLeft" && !isGameOver) {
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
function moveCars() {
  moveCarsTime = setInterval(() => {
    if (!isGameOver) {
      cars.forEach((carObj) => {
        carObj.top += 8;
        carObj.car.style.top = carObj.top + "px";
        if (
          playerCar_top + 200 >= carObj.top &&
          playerCar_top <= carObj.top + 170 &&
          playerCar_left <= carObj.left + 70 &&
          playerCar_left + 80 >= carObj.left
        ) {
          stopMoving();
          isGameOver = true;
          console.log(isGameOver);
        }
        if (carObj.top >= 800) {
          carObj.car.remove();
          cars.splice(cars.indexOf(carObj), 1);
        }
      });
    }
  }, 30);
}
function moveCoins() {
  moveCoinsTime = setInterval(() => {
    if (!isGameOver) {
      coinArray.forEach((coinObj) => {
        coinObj.top += 5;
        coinObj.coin.style.top = coinObj.top + "px";
        if (
          playerCar_top + 200 >= coinObj.top &&
          playerCar_top <= coinObj.top + 110 &&
          playerCar_left <= coinObj.left + 20 &&
          playerCar_left + 100 >= coinObj.left
        ) {
          score += coinObj.score;
          scoreBoard.innerHTML = score;
          coinObj.score = 0;
          coinObj.coin.remove();
          coinArray.splice(coinArray.indexOf(coinObj), 1);
        }
        if (coinObj.top >= 800) {
          coinObj.coin.remove();
          coinArray.splice(coinArray.indexOf(coinObj), 1);
          console.log("removed");
        }
      });
    }
  }, 30);
}

function moveRight(e) {
  clearInterval(leftTime);
  clearInterval(rightTime);

  rightTime = setInterval(() => {
    playerCar_left += 10;
    playerCar.style.left = playerCar_left + "px";
    if (playerCar_left >= 650) {
      stopMoving();
    }
  }, 30);
}
function moveLeft(e) {
  clearInterval(leftTime);
  clearInterval(rightTime);

  leftTime = setInterval(() => {
    playerCar_left -= 10;
    playerCar.style.left = playerCar_left + "px";
    if (playerCar_left <= 0) {
      stopMoving();
    }
  }, 30);
}
function stopMoving(e) {
  stopInterval = setInterval(() => {
    console.log("Game ended");
    clearInterval(leftTime);
    clearInterval(rightTime);
    clearInterval(moveCarsTime);
    clearInterval(createCarsTime);
    clearInterval(createCoinsTime);
    clearInterval(moveCoinsTime);
    clearInterval(moveRoadsTime);
    message.innerHTML = "Game Over";
  });
}
