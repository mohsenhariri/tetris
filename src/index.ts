import "./assets/styles/style.css";
import PixelCanvas from "./PixelCanvas";

// HTML
const scoreHtml = document.createElement("h1");
scoreHtml.innerText = "SCORE 0";
document.body.appendChild(scoreHtml);

// End of HTML

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

// // border
// ctxBackground.pTranslate(2,2)
// ctxBackground.rotate(45)
// ctxBackground.fillStyle = "red";
// ctxBackground.pFillRect(0, 0, 1, 1);
// ctxBackground.setTransform(1, 0, 0, 1, 0, 0);

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

// START

interface Player {
  level: number;
  score: number;
  gameOver: boolean;
}

const player: Player = {
  level: 1,
  score: 0,
  // difficultyFactor: () => (3 / 4) ** player.level,
  gameOver: false,
};

const type = ["I", "J", "L", "O", "S", "T", "Z"];

// const type = "I";

const tetromino = {
  x: width / 2,
  y: -1,
  // y: 10,

  type: type[Math.floor(Math.random() * type.length)],
  orientation: 0,
};

let ctxBoardState = ctxBoard.getImageData(0, 0, canvasWidth, canvasHeight);

const draw = () => {
  ctxBoard.putImageData(ctxBoardState, 0, 0);

  if (tetromino.type === "S") {
    ctxBoard.fillStyle = "pink";
    ctxBoard.pFillRect(tetromino.x, tetromino.y, 2, 1);
    ctxBoard.pFillRect(tetromino.x - 1, tetromino.y + 1, 2, 1);
  }

  if (tetromino.type === "Z") {
    ctxBoard.fillStyle = "green";
    ctxBoard.pFillRect(tetromino.x, tetromino.y, 2, 1);
    ctxBoard.pFillRect(tetromino.x + 1, tetromino.y + 1, 2, 1);
  }
  if (tetromino.type === "T") {
    ctxBoard.fillStyle = "brown";
    if (tetromino.orientation === 0) {
      ctxBoard.pFillRect(tetromino.x, tetromino.y, 1, 1);
      ctxBoard.pFillRect(tetromino.x - 1, tetromino.y + 1, 3, 1);
    }
    if (tetromino.orientation === 1) {
      ctxBoard.pFillRect(tetromino.x, tetromino.y, 1, 3);
      ctxBoard.pFillRect(tetromino.x + 1, tetromino.y + 1, 1, 1);
    }
    if (tetromino.orientation === 2) {
      ctxBoard.pFillRect(tetromino.x - 1, tetromino.y + 1, 3, 1);
      ctxBoard.pFillRect(tetromino.x, tetromino.y + 2, 1, 1);
    }
    if (tetromino.orientation === 3) {
      ctxBoard.pFillRect(tetromino.x, tetromino.y, 1, 3);
      ctxBoard.pFillRect(tetromino.x, tetromino.y + 1, -1, 1);
    }
  }

  if (tetromino.type === "J") {
    ctxBoard.fillStyle = "red";
    ctxBoard.pFillRect(tetromino.x, tetromino.y, 1, 3);
    ctxBoard.pFillRect(tetromino.x, tetromino.y + 2, -1, 1);
  }

  if (tetromino.type === "L") {
    ctxBoard.fillStyle = "purple";
    ctxBoard.pFillRect(tetromino.x, tetromino.y, 1, 1);
    ctxBoard.pFillRect(tetromino.x, tetromino.y + 1, 1, 1);
    ctxBoard.pFillRect(tetromino.x, tetromino.y + 2, 1, 1);
    ctxBoard.pFillRect(tetromino.x + 1, tetromino.y + 2, 1, 1);
  }

  if (tetromino.type === "I") {
    if (tetromino.orientation === 0 || tetromino.orientation === 2) {
      ctxBoard.fillStyle = "yellow";
      ctxBoard.pFillRect(tetromino.x, tetromino.y, 1, 4);
    }
    if (tetromino.orientation === 1 || tetromino.orientation === 3) {
      ctxBoard.fillStyle = "yellow";
      ctxBoard.pFillRect(tetromino.x - 2, tetromino.y, 4, 1);
    }
  }
  if (tetromino.type === "O") {
    ctxBoard.fillStyle = "violet";
    ctxBoard.pFillRect(tetromino.x, tetromino.y, 2, 2);
  }
};
// draw();

// ctxBoard.fillStyle = "white"

// ctxBoard.fillRect(90, 90, 50, 50);

// console.log(ctxBoard.isPointInStroke(90, 90));
// console.log(ctxBoard.isPointInPath(90, 90));

// ctxBackground.isPointInPath

// const tetromino = { x: width / 2, y: -1, ori: 3, type: "O" };

// let canMove = (arrow: string) => {
//   // ctxBoard.isFree(tetromino.x + 2, tetromino.y + 2)

//   const type = tetromino.type;
//   return true;
// };

const handleRight = () => {
  let condition: boolean;
  if (tetromino.type === "L") {
    condition =
      ctxBoard.isFree(tetromino.x + 1, tetromino.y) &&
      ctxBoard.isFree(tetromino.x + 1, tetromino.y + 1) &&
      ctxBoard.isFree(tetromino.x + 1 + 1, tetromino.y + 2);
  }
  if (tetromino.type === "J") {
    condition =
      ctxBoard.isFree(tetromino.x + 1, tetromino.y) &&
      ctxBoard.isFree(tetromino.x + 1, tetromino.y + 1) &&
      ctxBoard.isFree(tetromino.x + 1, tetromino.y + 2);
  }
  if (tetromino.type === "T") {
    if (tetromino.orientation === 0) {
      condition =
        ctxBoard.isFree(tetromino.x + 1, tetromino.y) &&
        ctxBoard.isFree(tetromino.x + 1 + 1, tetromino.y + 1);
    }
    if (tetromino.orientation === 1) {
      condition =
        ctxBoard.isFree(tetromino.x + 1, tetromino.y) &&
        ctxBoard.isFree(tetromino.x + 1 + 1, tetromino.y + 1) &&
        ctxBoard.isFree(tetromino.x + 1, tetromino.y + 2);
    }
    if (tetromino.orientation === 2) {
      condition =
        ctxBoard.isFree(tetromino.x + 1 + 1, tetromino.y + 1) &&
        ctxBoard.isFree(tetromino.x + 1, tetromino.y + 1 + 1);
      // ctxBoard.isFree(tetromino.x + 1, tetromino.y + 2);
    }
    if (tetromino.orientation === 3) {
      condition =
        ctxBoard.isFree(tetromino.x + 1, tetromino.y) &&
        ctxBoard.isFree(tetromino.x + 1, tetromino.y + 1) &&
        ctxBoard.isFree(tetromino.x + 1, tetromino.y + 2);
    }
  }

  if (tetromino.type === "S") {
    condition =
      ctxBoard.isFree(tetromino.x + 1 + 1, tetromino.y) &&
      ctxBoard.isFree(tetromino.x + 1, tetromino.y + 1);
  }

  if (tetromino.type === "Z") {
    condition =
      ctxBoard.isFree(tetromino.x + 1 + 1, tetromino.y) &&
      ctxBoard.isFree(tetromino.x + 2 + 1, tetromino.y + 1);
  }
  if (tetromino.type === "O") {
    condition =
      ctxBoard.isFree(tetromino.x + 1 + 1, tetromino.y) &&
      ctxBoard.isFree(tetromino.x + 1 + 1, tetromino.y + 1);
  }

  if (tetromino.type === "I") {
    if (tetromino.orientation === 0 || tetromino.orientation === 2) {
      condition =
        ctxBoard.isFree(tetromino.x + 1, tetromino.y) &&
        ctxBoard.isFree(tetromino.x + 1, tetromino.y + 1) &&
        ctxBoard.isFree(tetromino.x + 1, tetromino.y + 2) &&
        ctxBoard.isFree(tetromino.x + 1, tetromino.y + 3);
    }
    if (tetromino.orientation === 1 || tetromino.orientation === 3) {
      condition = ctxBoard.isFree(tetromino.x + 1 + 1, tetromino.y);
    }
  }
  if (condition) {
    ctxBoard.clearRect(0, 0, canvasWidth, canvasHeight);
    tetromino.x++;
    draw();
  }
};

const handleLeft = () => {
  let condition;
  if (tetromino.type === "L") {
    condition =
      ctxBoard.isFree(tetromino.x - 1, tetromino.y) &&
      ctxBoard.isFree(tetromino.x - 1, tetromino.y + 1) &&
      ctxBoard.isFree(tetromino.x - 1, tetromino.y + 2);
  }
  if (tetromino.type === "J") {
    condition =
      ctxBoard.isFree(tetromino.x - 1, tetromino.y) &&
      ctxBoard.isFree(tetromino.x - 1, tetromino.y + 1) &&
      ctxBoard.isFree(tetromino.x - 1 - 1, tetromino.y + 2);
  }
  if (tetromino.type === "S") {
    condition =
      ctxBoard.isFree(tetromino.x - 1, tetromino.y) &&
      ctxBoard.isFree(tetromino.x - 1 - 1, tetromino.y + 1);
  }
  if (tetromino.type === "Z") {
    condition =
      ctxBoard.isFree(tetromino.x - 1, tetromino.y) &&
      ctxBoard.isFree(tetromino.x + 1 - 1, tetromino.y + 1);
  }
  if (tetromino.type === "T") {
    if (tetromino.orientation === 0) {
      condition =
        ctxBoard.isFree(tetromino.x - 1, tetromino.y) &&
        ctxBoard.isFree(tetromino.x - 1 - 1, tetromino.y + 1);
    }
    if (tetromino.orientation === 1) {
      condition =
        ctxBoard.isFree(tetromino.x - 1, tetromino.y) &&
        ctxBoard.isFree(tetromino.x - 1, tetromino.y + 1) &&
        ctxBoard.isFree(tetromino.x - 1, tetromino.y + 2);
    }
    if (tetromino.orientation === 2) {
      condition =
        ctxBoard.isFree(tetromino.x - 1 - 1, tetromino.y + 1) &&
        ctxBoard.isFree(tetromino.x - 1, tetromino.y + 1 + 1);
    }
    if (tetromino.orientation === 3) {
      condition =
        ctxBoard.isFree(tetromino.x - 1, tetromino.y) &&
        ctxBoard.isFree(tetromino.x - 1 - 1, tetromino.y + 1) &&
        ctxBoard.isFree(tetromino.x - 1, tetromino.y + 2);
    }
  }
  if (tetromino.type === "O") {
    condition =
      ctxBoard.isFree(tetromino.x - 1, tetromino.y) &&
      ctxBoard.isFree(tetromino.x - 1, tetromino.y + 1);
  }
  if (tetromino.type === "I") {
    if (tetromino.orientation === 0 || tetromino.orientation === 2) {
      condition =
        ctxBoard.isFree(tetromino.x - 1, tetromino.y) &&
        ctxBoard.isFree(tetromino.x - 1, tetromino.y + 1) &&
        ctxBoard.isFree(tetromino.x - 1, tetromino.y + 2) &&
        ctxBoard.isFree(tetromino.x - 1, tetromino.y + 3);
    }
    if (tetromino.orientation === 1 || tetromino.orientation === 3) {
      condition = ctxBoard.isFree(tetromino.x - 1 - 2, tetromino.y);
    }
  }
  if (condition) {
    ctxBoard.clearRect(0, 0, canvasWidth, canvasHeight);
    tetromino.x--;
    draw();
  }
};

const handleDown = () => {
  let condition;
  if (tetromino.type === "L") {
    condition =
      ctxBoard.isFree(tetromino.x, tetromino.y + 2 + 1) &&
      ctxBoard.isFree(tetromino.x + 1, tetromino.y + 2 + 1);
  }
  if (tetromino.type === "J") {
    condition =
      ctxBoard.isFree(tetromino.x, tetromino.y + 2 + 1) &&
      ctxBoard.isFree(tetromino.x - 1, tetromino.y + 2 + 1);
  }

  if (tetromino.type === "S") {
    condition =
      ctxBoard.isFree(tetromino.x - 1, tetromino.y + 1 + 1) &&
      ctxBoard.isFree(tetromino.x, tetromino.y + 1 + 1) &&
      ctxBoard.isFree(tetromino.x + 1, tetromino.y + 1);
  }
  if (tetromino.type === "Z") {
    if (tetromino.orientation === 0) {
      condition =
        ctxBoard.isFree(tetromino.x, tetromino.y + 1) &&
        ctxBoard.isFree(tetromino.x + 1, tetromino.y + 1 + 1) &&
        ctxBoard.isFree(tetromino.x + 2, tetromino.y + 1 + 1);
    }
    if (tetromino.orientation === 1) {
      condition =
        ctxBoard.isFree(tetromino.x, tetromino.y + 1) &&
        ctxBoard.isFree(tetromino.x + 1, tetromino.y + 1 + 1) &&
        ctxBoard.isFree(tetromino.x + 2, tetromino.y + 1 + 1);
    }
  }

  if (tetromino.type === "T") {
    if (tetromino.orientation === 0) {
      condition =
        ctxBoard.isFree(tetromino.x - 1, tetromino.y + 1 + 1) &&
        ctxBoard.isFree(tetromino.x, tetromino.y + 1 + 1) &&
        ctxBoard.isFree(tetromino.x + 1, tetromino.y + 1 + 1);
    }
    if (tetromino.orientation === 1) {
      condition =
        ctxBoard.isFree(tetromino.x + 1, tetromino.y + 1 + 1) &&
        ctxBoard.isFree(tetromino.x, tetromino.y + 2 + 1);
    }
    if (tetromino.orientation === 2) {
      condition =
        ctxBoard.isFree(tetromino.x - 1, tetromino.y + 1 + 1) &&
        ctxBoard.isFree(tetromino.x + 1, tetromino.y + 1 + 1) &&
        ctxBoard.isFree(tetromino.x, tetromino.y + 2 + 1);
    }
    if (tetromino.orientation === 3) {
      condition =
        ctxBoard.isFree(tetromino.x - 1, tetromino.y + 1 + 1) &&
        ctxBoard.isFree(tetromino.x, tetromino.y + 2 + 1);
    }
  }
  if (tetromino.type === "O") {
    condition =
      ctxBoard.isFree(tetromino.x, tetromino.y + 1 + 1) &&
      ctxBoard.isFree(tetromino.x + 1, tetromino.y + 1 + 1);
  }
  if (tetromino.type === "I") {
    if (tetromino.orientation === 0 || tetromino.orientation === 2) {
      condition = ctxBoard.isFree(tetromino.x, tetromino.y + 3 + 1);
    }
    if (tetromino.orientation === 1 || tetromino.orientation === 3) {
      condition =
        ctxBoard.isFree(tetromino.x - 2, tetromino.y + 1) &&
        ctxBoard.isFree(tetromino.x - 1, tetromino.y + 1) &&
        ctxBoard.isFree(tetromino.x, tetromino.y + 1) &&
        ctxBoard.isFree(tetromino.x + 1, tetromino.y + 1);
    }
  }
  if (condition) {
    ctxBoard.clearRect(0, 0, canvasWidth, canvasHeight);
    tetromino.y++;
    draw();
  } else {
    scoreCalculator();
    if (ctxBoard.isFree(width / 2, 0)) {
      ctxBoardState = ctxBoard.getImageData(0, 0, canvasWidth, canvasHeight);
      tetromino.type = type[Math.floor(Math.random() * type.length)];
      tetromino.x = width / 2;
      tetromino.y = -1;
      draw();
    } else {
      player.gameOver = true;
      document.removeEventListener("keydown", handleKeyDown);
    }
  }
};

const handleRotate = () => {
  let condition = true;
  if (tetromino.type === "T") {
    if (tetromino.orientation === 0) {
      condition = ctxBoard.isFree(tetromino.x, tetromino.y + 2);
    }
    if (tetromino.orientation === 1) {
      condition = ctxBoard.isFree(tetromino.x - 1, tetromino.y);
    }
    if (tetromino.orientation === 2) {
      condition = ctxBoard.isFree(tetromino.x - 1, tetromino.y);
    }
    if (tetromino.orientation === 3) {
      condition = ctxBoard.isFree(tetromino.x + 1, tetromino.y);
    }
  }
  if (tetromino.type === "I") {
    if (tetromino.orientation === 0 || tetromino.orientation === 2) {
      condition = ctxBoard.isFree(tetromino.x + 1, tetromino.y);


    }
    if (tetromino.orientation === 1 || tetromino.orientation === 3) {
      // condition = ctxBoard.isFree(tetromino.x + 1, tetromino.y);

    }
  }
  console.log("xxxxx", tetromino.orientation);
  if (condition) {
    ctxBoard.clearRect(0, 0, canvasWidth, canvasHeight);
    tetromino.orientation < 3
      ? tetromino.orientation++
      : (tetromino.orientation = 0);
    draw();
  }
};

let previousTime = 0;
const update = (now: number) => {
  if (now - previousTime > 1000) {
    console.log("TETROMINO", tetromino);
    handleDown();
    previousTime = now;
  }
  if (!player.gameOver) {
    requestAnimationFrame(update);
  }
};

requestAnimationFrame(update);

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
      handleRotate();
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

const scoreCalculator = () => {
  let completeRowNumber = 0;
  for (let i = 0; i < height; i++) {
    let flag = true;
    let j = 0;
    while (j < width && flag) {
      if (ctxBoard.isFree(j, i) === true) {
        flag = false;
      } else {
        j++;
      }
    }
    if (j === 10) {
      completeRowNumber++;
      const d = ctxBoard.pGetImageData(0, 0, width, i);
      ctxBoard.pClearRect(0, i, width, 1);
      ctxBoard.pPutImageData(d, 0, 1);
      ctxBoardState = ctxBoard.getImageData(0, 0, canvasWidth, canvasHeight);
    }
  }
  let score = 0;
  if (completeRowNumber === 1) score = 10;
  if (completeRowNumber === 2) score = 25;
  if (completeRowNumber === 3) score = 45;
  if (completeRowNumber === 4) score = 80;

  player.score += score;
  scoreHtml.innerText = `SCORE ${player.score}`;
};
