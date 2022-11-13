const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

let playerWidthAndHeight = 0;
let playerX = 0;
let playerY = 0;
let playerColor = "orange";
let velocity = 0;

let controllerIndex = null;
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

let bluePressed = false;
let orangePressed = false;
let redPressed = false;
let greenPressed = false;

function setupCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  playerWidthAndHeight = canvas.width * 0.1;
  velocity = canvas.width * 0.01;

  playerX = (canvas.width - playerWidthAndHeight) / 2;
  playerY = (canvas.height - playerWidthAndHeight) / 2;
}

setupCanvas();

window.addEventListener("resize", setupCanvas);
window.addEventListener("gamepadconnected", (event) => {
  controllerIndex = event.gamepad.index;
  console.log("connected");
});

window.addEventListener("gamepaddisconnected", (event) => {
  console.log("disconnected");
  controllerIndex = null;
});

function clearScreen() {
  ctx.fillStyle = "#333331";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
  ctx.fillStyle = playerColor;
  ctx.fillRect(playerX, playerY, playerWidthAndHeight, playerWidthAndHeight);
}

function controllerInput() {
  if (controllerIndex !== null) {
    const gamepad = navigator.getGamepads()[controllerIndex];

    const buttons = gamepad.buttons;
    upPressed = buttons[12].pressed;
    downPressed = buttons[13].pressed;
    leftPressed = buttons[14].pressed;
    rightPressed = buttons[15].pressed;

    const stickDeadZone = 0.4;
    const leftRightValue = gamepad.axes[0];

    if (leftRightValue >= stickDeadZone) {
      rightPressed = true;
    } else if (leftRightValue <= -stickDeadZone) {
      leftPressed = true;
    }

    const upDownValue = gamepad.axes[1];

    if (upDownValue >= stickDeadZone) {
      downPressed = true;
    } else if (upDownValue <= -stickDeadZone) {
      upPressed = true;
    }

    redPressed = buttons[0].pressed;
    bluePressed = buttons[1].pressed;
    orangePressed = buttons[2].pressed;
    greenPressed = buttons[3].pressed;
  }
}

function movePlayer() {
  if (upPressed) {
    playerY -= velocity;
  }
  if (downPressed) {
    playerY += velocity;
  }
  if (leftPressed) {
    playerX -= velocity;
  }
  if (rightPressed) {
    playerX += velocity;
  }
}

function changePlayerColor() {
  if (bluePressed) {
    playerColor = "blue";
  }
  if (greenPressed) {
    playerColor = "green";
  }
  if (redPressed) {
    playerColor = "red";
  }
  if (orangePressed) {
    playerColor = "orange";
  }
}

function updatePlayer() {
  movePlayer();
  changePlayerColor();
}

function gameLoop() {
  clearScreen();
  drawPlayer();
  controllerInput();
  updatePlayer();
  requestAnimationFrame(gameLoop);
}

gameLoop();
