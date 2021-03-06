let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 9;
let ballSpeedY = 3;

let player1Score = 0;
let player2Score = 0;
const WINNING_SCORE = 7;

let showingWinScreen = false;

let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_THICKNESS = 10;
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

const handleMouseClick = evt => {
  if (showingWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
  }
};

window.onload = () => {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  let framesPerSecond = 30;
  setInterval(() => {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);

  canvas.addEventListener("mousedown", handleMouseClick);

  canvas.addEventListener("mousemove", evt => {
    let mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
  });
};

const ballReset = () => {
  if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
    showingWinScreen = true;
  }

  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
};

const computerMovement = () => {
  let paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2;

  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 6;
  } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= 6;
  }
};

const moveEverything = () => {
  if (showingWinScreen) {
    return;
  }

  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;

      let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player2Score++; // must be before ballReset()

      ballReset();
    }
  }

  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;

      let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player1Score++; // must be before ballReset()
      ballReset();
    }
  }

  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
};

const drawNet = () => {
  for (let i = 0; i < canvas.height; i += 40) {
    colorRect(canvas.width / 2 - 1, i, 2, 20, "white");
  }
};

const drawEverything = () => {
  // blanks out screen with black
  colorRect(0, 0, canvas.width, canvas.height, "black");

  if (showingWinScreen) {
    canvasContext.fillStyle = "white";

    if (player1Score >= WINNING_SCORE) {
      canvasContext.fillText("Winner: Player 1", 350, 200);
    } else if (player2Score >= WINNING_SCORE) {
      canvasContext.fillText("Winner: Player 2", 350, 200);
    }

    canvasContext.fillText("Click to continue", 350, 400);
    return;
  }

  drawNet();

  // left player paddle
  colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

  // right computer paddle
  colorRect(
    canvas.width - PADDLE_THICKNESS,
    paddle2Y,
    PADDLE_THICKNESS,
    PADDLE_HEIGHT,
    "white"
  );

  // draw ball
  colorCircle(ballX, ballY, 10, "white");

  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width - 100, 100);
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
