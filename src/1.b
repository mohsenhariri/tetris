import "./assets/styles/style.css";
import PixelCanvas from "./PixelCanvas";

const width = 10;
const height = 22;

const canvasWidth = 200;
const canvasHeight = 440;

const fragment = document.createDocumentFragment() as DocumentFragment;
const background = new PixelCanvas(
  canvasWidth,
  canvasHeight,
  20,
  20,
  "background",
  fragment
);
const board = new PixelCanvas(
  canvasWidth,
  canvasHeight,
  20,
  20,
  "board",
  fragment
);
document.body.appendChild(fragment);
const ctxBackground = background.ctx;
const ctxBoard = board.ctx;

// const isFree = board.isFreePixel

// border
// ctxBackground.fillStyle = "red";
// ctxBackground.pFillRect(0, 0, 1, 1);
// ctxBackground.pFillRect(width - 1, 0, 1, 1);
// ctxBackground.pFillRect(0, height - 1, 1, 1);
// ctxBackground.pFillRect(width - 1, height - 1, 1, 1);

const makeGrid = (
  ctx: CanvasRenderingContext2D,
  boardW: number,
  boardH: number
) => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "white";

  for (let r = 1; r < boardH; r += 1) {
    // Horizontal lines
    ctx.beginPath();
    ctx.pMoveTo(0, r);
    ctx.pLineTo(boardW, r);
    ctx.stroke();
    ctx.closePath();
  }
  for (let c = 1; c < boardW; c += 1) {
    // Vertical lines
    ctx.beginPath();
    ctx.pMoveTo(c, 0);
    ctx.pLineTo(c, boardH);
    ctx.stroke();
    ctx.closePath();
  }
};

makeGrid(ctxBackground, width, height);

// ctxBoard.fillStyle = "yellow";
// ctxBoard.pFillRect(5, 5, 1, 1);
// ctxBoard.pFillRect(5, 10, 1, 1);
// ctxBoard.pFillRect(3, 5, 1, 1);
// ctxBoard.pFillRect(9, 8, 1, 1);

const l = (x: number, y: number) => {
  ctxBoard.fillStyle = "purple";
  ctxBoard.pFillRect(x, y, 1, 2);
  ctxBoard.pFillRect(x, y + 2, 2, 1);
};

// ctxBoard.fillStyle = "purple";
// ctxBoard.pFillRect(0, 0, 2, 2);

// console.log(ctxBoard.isFree(0,0))

// ctxBoard.fillRect(90, 90, 50, 50);

// console.log(ctxBoard.isPointInStroke(90, 90));
// console.log(ctxBoard.isPointInPath(90, 90));

// ctxBackground.isPointInPath

const tetromino = { x: width / 2, y: -1, ori: 3, type: "O" };

const handleRight = () => {
  if (ctxBoard.isFree(tetromino.x + 1, tetromino.y)) {
    tetromino.x++;
  }
};
const handleLeft = () => {
  if (ctxBoard.isFree(tetromino.x - 1, tetromino.y)) {
    tetromino.x--;
  }
};

const handleDown = () => {
  tetromino.y++;
};

const handleKeyDown = (e: any) => {
  switch (e.code) {
    case "ArrowRight":
      handleRight();
      break;
    case "ArrowLeft":
      handleLeft();
      break;
    case "ArrowDown":
      e.preventDefault();
      handleDown();
      break;
    case "ArrowUp":
      // rotate();
      break;
    case "KeyQ":
      // rotate();
      break;
    case "KeyW":
      // playerRotate(1);
      break;
  }
};

document.addEventListener("keydown", handleKeyDown);

const draw = (x: number, y: number) => {
  console.log(ctxBoard.isFree(x, y));

  // if (ctxBoard.isFree(x, y))
  l(x, y);
};

let previousTime = 0;
const update = (now: number) => {
  console.log(tetromino.x, tetromino.y);
  if (now - previousTime > 1000) {
    handleDown();
    draw(tetromino.x, tetromino.y);
    previousTime = now;
  }
  if (true) {
    // console.log("Frame, player", player.score);
    requestAnimationFrame(update);
  }
};

requestAnimationFrame(update);
