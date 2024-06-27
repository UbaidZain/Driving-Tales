// Selectors
const playerCar = document.getElementById("player-car");
const message = document.getElementsByClassName("message")[0];
let playerCar_left = 0;
let rightTime;
let leftTime;
let stopInterval;

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
    // addRight();
    carControl();
    stopMoving();
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
