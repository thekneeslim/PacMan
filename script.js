var x = 220;
var y = 420;
var speed = 5;

var GAMESTATUS = true;

var ghosts        = [];
var pMAN          = [220, 420];
var blinkyGHOST   = [160, 320];
var inkyGHOST     = [200, 280];
var pinkyGHOST    = [200, 320];
var clydeGHOST    = [240, 320];
var cGRID = [];

var rects = [ {rx : 40,   ry : 40,  w : 120,  h : 80},
              {rx : 200,  ry : 0,   w : 40,   h : 120},
              {rx : 280,  ry : 40,  w : 120,  h : 80},
              {rx : 40,   ry : 160, w : 80,   h : 80},
              {rx : 160,  ry : 160, w : 120,  h : 80},
              {rx : 320,  ry : 160, w : 80,   h : 80},
              {rx : 0,    ry : 280, w : 80,   h : 40},
              {rx : 120,  ry : 280, w : 80,   h : 40},
              {rx : 240,  ry : 280, w : 80,   h : 40},
              {rx : 360,  ry : 280, w : 80,   h : 40},
              {rx : 0,    ry : 360, w : 80,   h : 80},
              {rx : 120,  ry : 320, w : 40,   h : 80},
              {rx : 160,  ry : 360, w : 120,  h : 40},
              {rx : 280,  ry : 320, w : 40,   h : 80},
              {rx : 360,  ry : 360, w : 80,   h : 80},
              {rx : 120,  ry : 440, w : 80,   h : 40},
              {rx : 240,  ry : 440, w : 80,   h : 40},
              {rx : 40,   ry : 480, w : 40,   h : 40},
              {rx : 360,  ry : 480, w : 40,   h : 40},
              {rx : 40,   ry : 560, w : 40,   h : 80},
              {rx : 80,   ry : 600, w : 40,   h : 40},
              {rx : 120,  ry : 520, w : 40,   h : 40},
              {rx : 160,  ry : 520, w : 40,   h : 120},
              {rx : 240,  ry : 520, w : 40,   h : 120},
              {rx : 280,  ry : 520, w : 40,   h : 40},
              {rx : 320,  ry : 600, w : 40,   h : 40},
              {rx : 360,  ry : 560, w : 40,   h : 80}];

var map = [   [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
              [1, 2, 2, 2, 0, 2, 0, 2, 2, 2, 1],
              [0, 2, 2, 2, 0, 2, 0, 2, 2, 2, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 2, 2, 0, 2, 2, 2, 0, 2, 2, 0],
              [0, 2, 2, 0, 2, 2, 2, 0, 2, 2, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [2, 2, 0, 2, 2, 5, 2, 2, 0, 2, 2],
              [0, 0, 0, 2, 5, 5, 5, 2, 0, 0, 0],
              [2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2],
              [2, 2, 0, 5, 5, 5, 5, 5, 0, 2, 2],
              [0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0],
              [0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0],
              [0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0],
              [1, 2, 0, 0, 2, 0, 2, 0, 0, 2, 1],
              [0, 2, 2, 0, 2, 0, 2, 0, 2, 2, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

var MOVING_UP = false;
var MOVING_DOWN = false;
var MOVING_LEFT = false;
var MOVING_RIGHT = false;

var ctx = document.getElementById('gCanvas').getContext('2d');
var cW = ctx.canvas.width;
var cH = ctx.canvas.height;

//  GAME START CONTROL
window.addEventListener('load', function (event) {
  initCanvas();
});

// INITIALIZING CANVAS PROPERTIES
function initCanvas () {
  pM();
  var movePMInterval = setInterval(pM, speed);
}

// PUSHING ALL GHOSTS COORDINATES INTO AN ARRAY
function ghostArray() {
  ghosts.push(blinkyGHOST);
  ghosts.push(inkyGHOST);
  ghosts.push(pinkyGHOST);
  ghosts.push(clydeGHOST);
}

// PM FUNCTION
function pM () {
  ctx.clearRect(0, 0, cW, cH);
  drawGrid();
  inky();
  pinky();
  clyde();
  blinky();

  if (checkWin() === false) {
    if (checkBorder(pMAN)) {
      moveIcons(pMAN);
      eatFood();
      teleport(pMAN);
      checkDeath();
      // }
    }
  } else {
    document.getElementById('winMusic').play();
    GAMESTATUS = false;
    // gameOverNote();
  }

  drawFood();
  drawPM(pMAN[0], pMAN[1]);
}

// GHOST FUNCTIONS & MOVEMENT
function inky() {
  drawINKY();
}

function pinky() {
  drawPINKY();
}

function clyde() {
  drawCLYDE();
}

function blinky() {
  drawBLINKY();
}

// DRAWING PACMAN GRID MAZE
function drawGrid(rx, ry, w, h) {
  for (var i = 0; i < rects.length; i++) {
    ctx.strokeStyle = "#3DFFF8";
    ctx.strokeRect(rects[i].rx, rects[i].ry, rects[i].w, rects[i].h);
  }
}

// DRAWING PACKMAN
function drawPM() {
  ctx.save();

  // DRAWING HERE
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.arc(pMAN[0], pMAN[1], 13, 0.25*Math.PI, 1.7*Math.PI);
  ctx.lineTo(pMAN[0]-8, pMAN[1]);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();

  // RESTORING
  ctx.restore();
}

// DRAWING INKY
function drawINKY () {
  var inky = new Image();
  inky.src = "img/inky.png";
  ctx.drawImage(inky, inkyGHOST[0] + 5, inkyGHOST[1] + 5, 30, 30);
}

// DRAWING CLYDE
function drawCLYDE () {
  var clyde = new Image();
  clyde.src = "img/clyde.png";
  ctx.drawImage(clyde, clydeGHOST[0] + 5, clydeGHOST[1] + 5, 30, 30);
}

// DRAWING BLINKY
function drawBLINKY () {
  var blinky = new Image();
  blinky.src = "img/blinky.png";
  ctx.drawImage(blinky, blinkyGHOST[0] + 5, blinkyGHOST[1] + 5, 30, 30);
}

// DRAWING PINKY
function drawPINKY () {
  var pinky = new Image();
  pinky.src = "img/pinky.png";
  ctx.drawImage(pinky, pinkyGHOST[0] + 5, pinkyGHOST[1] + 5, 30, 30);
}

// DRAWING FOOD
function drawFood() {
  for (var i = 0; i < map.length; i++) {
    for (var k = 0; k < map[i].length; k++) {
      if (map[i][k] === 0) {
        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.arc((40*k) + 20, (40*i)+20, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
      if (map[i][k] === 1) {
        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.arc((40*k) + 20, (40*i)+20, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// CHECKING DEATH
  function checkDeath() {
    ghostArray();

    for(var i = 0; i < ghosts.length; i++) {
      // CHECKING TOP COLLIDE
      if (pMAN[0] === ghosts[i][0]) {
        if(pMAN[1] >= ghosts[i][1] && pMAN[1] <= (ghosts[i][1] + 30)) {
          GAMESTATUS = false;
          document.getElementById('loseMusic').play();
          return true;
        }
      }
      // CHECKING BOTTOM COLLIDE
      if (pMAN[0] === (ghosts[i][0] + 30)) {
        if(pMAN[1] >= ghosts[i][1] && pMAN[1] <= (ghosts[i][1] + 30)) {
          GAMESTATUS = false;
          document.getElementById('loseMusic').play();
          return true;
        }
      }
      // CHECKING LEFT COLLIDE
      if (pMAN[1] === ghosts[i][1]) {
        if(pMAN[0] >= ghosts[i][0] && pMAN[0] <= (ghosts[i][0] + 30)) {
          GAMESTATUS = false;
          document.getElementById('loseMusic').play();
          return true;
        }
      }
      // CHECKING RIGHT COLLIDE
      if (pMAN[1] === (ghosts[i][1] + 30)) {
        if(pMAN[0] >= ghosts[i][0] && pMAN[0] <= (ghosts[i][0] + 30)) {
          GAMESTATUS = false;
          document.getElementById('loseMusic').play();
          return true;
        }
      }
    }
  }

// EATING FOOD
function eatFood () {
  for (var i = 0; i < map.length; i++) {
    for(var k = 0; k< map[i].length; k++) {
      if (Math.floor(pMAN[0]/40) ===  k && Math.floor(pMAN[1]/40) === i) {
        if (map[i][k] === 0 || map[i][k] === 1) {
          map[i][k] = 3;
          document.getElementById('eatFootMusic').play()
        }
      }
    }
  }
}

// LISTENING FOR KEYBOARD INPUTS
document.addEventListener('keydown', function (event) {
  var keyPress = event.keyCode;
  defaultMovements();
  // if (isPointInRects(pMAN[0],pMAN[1]) === false) {
    if (keyPress === 38) {
      MOVING_UP = true;
    } else if (keyPress === 40) {
      MOVING_DOWN = true;
    } else if (keyPress === 37) {
      MOVING_LEFT = true;
    } else if (keyPress === 39) {
      MOVING_RIGHT = true;
    }
  // }
});

// TELEPORT FUNCTION
  function teleport(name) {
    if (name[0] === 20) {
      if (name[1] >= 336 && name[1] <= 344) {
        name[0] = 420;
        name[1] = 340;
        x = 420;
        y = 340;
      }
    } else if (name[0] === 420) {
      if (name[1] >= 336 && name[1] <= 344) {
        name[0] = 20;
        name[1] = 340;
        x = 20;
        y = 340;
      }
    }
  }

// CHECKING BORDER
function checkBorder (name) {
  if(MOVING_DOWN && name[1] === cH - 20) {
    name[1] = name[1];
    MOVING_DOWN = false;
  }
  if (MOVING_UP && name[1] === 20) {
    name[1] = name[1];
    MOVING_UP = false;
  }
  if (MOVING_RIGHT && name[0] === cW - 20) {
    name[0] = name[0];
    MOVING_RIGHT = false;
  }
  if (MOVING_LEFT && name[0] === 20) {
    name[0] = name[0];
    MOVING_LEFT = false;
  }
  return true;
}

// MOVING ICONS
function moveIcons (name) {
  var dx = 0;
  var dy = 0;
  if (MOVING_DOWN) {
    dy++;
  }
  if (MOVING_UP) {
    dy--;
  }
  if (MOVING_LEFT) {
    dx--;
  }
  if (MOVING_RIGHT) {
    dx++;
  }

  // only actually set the new values of
  // x and y if there was no collision.
  if (checkRectCollide(name[0] + dx, name[1] + dy) === false) {
    name[0] = name[0] + dx;
    name[1] = name[1] + dy;
  }
}

// PREVENTING ICONS FROM ENTERING RECTANGLE
function checkRectCollide(ix, iy) {
  var collisionDistance = 15;

  for(var i = 0; i < rects.length; i++) {
    // CHECKING TOP COLLIDE
    if (MOVING_DOWN && iy === (rects[i].ry - collisionDistance)) {
      if (ix >= (rects[i].rx - collisionDistance) && ix <= (rects[i].rx + rects[i].w + collisionDistance)) {
        return true;
      }
    }
    // CHECKING BOTTOM COLLIDE
    if (MOVING_UP && iy === (rects[i].ry + rects[i].h + collisionDistance)) {
      if (ix >= (rects[i].rx - collisionDistance) && ix <= (rects[i].rx + rects[i].w + collisionDistance)) {
        return true;
      }
    }
    // CHECKING LEFT COLLIDE
    if (MOVING_RIGHT && ix === (rects[i].rx - collisionDistance)) {
      if (iy >= (rects[i].ry - collisionDistance) && iy <= (rects[i].ry + rects[i].h + collisionDistance)) {
        return true;
      }
    }
    // CHECKING RIGHT COLLIDE
    if (MOVING_LEFT && ix === (rects[i].rx + rects[i].w + collisionDistance)) {
      if (iy >= (rects[i].ry - collisionDistance) && iy <= (rects[i].ry + rects[i].h + collisionDistance)) {
        return true;
      }
    }
  }

  return false;
}

// CHECK WIN FUNCTION
  function checkWin() {
    for (var i = 0; i < map.length; i++) {
      for(var k = 0; k < map[i].length; k++) {
        if(map[i][k] === 0) {
          return false;
        }
      }
    }
    return true;
  }

// TO RESTRICT MOVEMENT OF PACMAN
function defaultMovements () {
  MOVING_UP = false;
  MOVING_DOWN = false;
  MOVING_LEFT = false;
  MOVING_RIGHT = false;
}

// FORMING GRIDS & NAMING THEM IN ARRAY
// function mainGrid() {
//   for(var i = 0; i < cH; i += 40) {
//     var arrayK = [];
//     for(var k = 0; k < cW; k += 40) {
//
//       ctx.strokeRect(k, i, 40, 40);
//       arrayK.push(0);
//
//     }
//     cGRID.push(arrayK);
//   }
// }
