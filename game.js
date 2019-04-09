let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 4;

let paddle1Y = 250;
const PADDLE_HEIGHT = 100;

const calculateMousePos = evt => {
  let rect = canvas.getBoundingClientRect(); // method returns the size of an element and its position relative to the viewport.
  let root = document.documentElement; // returns the Element that is the root element of the document (for example, the <html> element for HTML documents).
  let mouseX = evt.clientX - rect.left - root.scrollLeft; // element.scrollLeft property gets or sets the number of pixels that an element's content is scrolled from its left edge.
  let mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
};

window.onload = () => {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  let framesPerSecond = 30;
  setInterval(() => {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);

  canvas.addEventListener("mousemove", evt => {
    let mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
    // console.log(mousePos);
  });
};

const moveEverything = () => {
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;

  if (ballX < 0) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballX > canvas.width) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
};

const drawEverything = () => {
  // blanks out screen with black
  colorRect(0, 0, canvas.width, canvas.height, "black");

  // left paddle
  colorRect(0, paddle1Y, 10, PADDLE_HEIGHT, "white");

  // draw ball
  colorCircle(ballX, ballY, 10, "white");
};

const colorCircle = (centerX, centerY, radius, drawColor) => {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true); // 2PIRadians = 360 deg
  canvasContext.fill();
};

const colorRect = (leftX, topY, width, height, drawColor) => {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
};
