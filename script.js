var speed = 5;

var GAMESTATUS = true;
var PILLACTIVE = false;

var pMAN          = [220, 420];
var blinkyGHOST   = [180, 340];
var inkyGHOST     = [220, 300];
var pinkyGHOST    = [220, 340];
var clydeGHOST    = [260, 340];
var ghosts        = [blinkyGHOST, inkyGHOST, pinkyGHOST, clydeGHOST];

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
  ghostMove(inkyGHOST);
  pM();
  var movePMInterval = setInterval(pM, speed);
}

// PM FUNCTION
function pM () {
  ctx.clearRect(0, 0, cW, cH);
  drawGrid();


  if (checkWin() === false) {
    if (checkDeath() === false) {
      if (checkBorder(pMAN)) {
        moveIcons(pMAN);
        inky();
        eatFood();
        teleport(pMAN);
        checkDeath();
      }

    }
  } else {
    document.getElementById('winMusic').play();
    GAMESTATUS = false;
    // gameOverNote();
  }

  drawFood();
  drawPM(pMAN[0], pMAN[1]);
  inky(inkyGHOST[0], inkyGHOST[1]);
  // pinky(pinkyGHOST[0], pinkyGHOST[1]);
  // clyde(clydeGHOST[0], clydeGHOST[1]);
  // blinky(blinkyGHOST[0], blinkyGHOST[1]);
}

// GHOST FUNCTIONS & MOVEMENT
function inky() {
  if (checkRectCollide(inkyGHOST[0], inkyGHOST[1]) === true) {
    ghostMove(inkyGHOST);
  }
  drawINKY();
}

function pinky() {
  // ghostMove(pinkyGHOST)
  drawPINKY();
}

function clyde() {
  // ghostMove(clydeGHOST);
  drawCLYDE();
}

function blinky() {
  // ghostMove(blinkyGHOST);
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
  if (PILLACTIVE === false) {
    inky.src = "img/inky.png";
  } else if (PILLACTIVE === true) {
    pinky.src = "img/undead.gif";
  }
  ctx.beginPath();
  ctx.drawImage(inky, inkyGHOST[0] - 15, inkyGHOST[1] - 15, 30, 30);
  ctx.closePath();
}

// DRAWING CLYDE
function drawCLYDE () {
  var clyde = new Image();
  if (PILLACTIVE === false) {
    clyde.src = "img/clyde.png";
  } else if (PILLACTIVE === true) {
    pinky.src = "img/undead.gif";
  }
  ctx.beginPath();
  ctx.drawImage(clyde, clydeGHOST[0] - 15, clydeGHOST[1] -15 , 30, 30);
  ctx.closePath();
}

// DRAWING BLINKY
function drawBLINKY () {
  var blinky = new Image();
  if (PILLACTIVE === false) {
    blinky.src = "img/blinky.png";
  } else if (PILLACTIVE === true) {
    pinky.src = "img/undead.gif";
  }
  ctx.beginPath();
  ctx.drawImage(blinky, blinkyGHOST[0] - 15, blinkyGHOST[1] - 15, 30, 30);
  ctx.closePath();
}

// DRAWING PINKY
function drawPINKY () {
  var pinky = new Image();
  if (PILLACTIVE === false) {
    pinky.src = "img/pinky.png";
  } else if (PILLACTIVE === true) {
    pinky.src = "img/undead.gif";
  }
  ctx.beginPath();
  ctx.drawImage(pinky, pinkyGHOST[0] - 15, pinkyGHOST[1] - 15, 30, 30);
  ctx.closePath();
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
    var m = 0;
    var g;
    for (var i = 0; i < ghosts.length; i++) {
      // CHECKING TOP COLLIDE
      if (pMAN[0] === ghosts[i][0]) {
        if(pMAN[1] >= ghosts[i][1] && pMAN[1] <= (ghosts[i][1] + 30)) {
          if (PILLACTIVE === false) {
            m = m + 1;
          } else if (PILLACTUVE === true) {
            m = m - 1
            g = ghosts[i];
          }
        }
      }
      // CHECKING BOTTOM COLLIDE
      if (pMAN[0] === (ghosts[i][0] + 30)) {
        if(pMAN[1] >= ghosts[i][1] && pMAN[1] <= (ghosts[i][1] + 30)) {
          if (PILLACTIVE === false) {
            m = m + 1;
          } else if (PILLACTUVE === true) {
            m = m - 1
            g = ghosts[i];
          }
        }
      }
      // CHECKING LEFT COLLIDE
      if (pMAN[1] === ghosts[i][1]) {
        if(pMAN[0] >= ghosts[i][0] && pMAN[0] <= (ghosts[i][0] + 30)) {
          if (PILLACTIVE === false) {
            m = m + 1;
          } else if (PILLACTUVE === true) {
            m = m - 1
            g = ghosts[i];
          }
        }
      }
      // CHECKING RIGHT COLLIDE
      if (pMAN[1] === (ghosts[i][1] + 30)) {
        if(pMAN[0] >= ghosts[i][0] && pMAN[0] <= (ghosts[i][0] + 30)) {
          if (PILLACTIVE === false) {
            m = m + 1;
          } else if (PILLACTIVE === true) {
            m = m - 1
            g = ghosts[i];
          }
        }
      }
    }
    if (m > 0) {
      GAMESTATUS = false;
      document.getElementById('loseMusic').play();
      return true;
    }
    if (m < 0) {

      document.getElementById('eatghost').play();
      return false;
    }
    return false;
  }

// EATING FOOD
function eatFood () {
  for (var i = 0; i < map.length; i++) {
    for(var k = 0; k< map[i].length; k++) {
      if (Math.floor(pMAN[0]/40) ===  k && Math.floor(pMAN[1]/40) === i) {
        if (map[i][k] === 0) {
          map[i][k] = 3;
          document.getElementById('eatFootMusic').play()
        }
        if (map[i][k] === 1) {
          map[i][k] = 4;
          document.getElementById('siren').play()
        }
      }
    }
  }
}

// LISTENING FOR KEYBOARD INPUTS
document.addEventListener('keydown', function (event) {
  var keyPress = event.keyCode;
  defaultMovements();
    if (keyPress === 38) {
      MOVING_UP = true;
    } else if (keyPress === 40) {
      MOVING_DOWN = true;
    } else if (keyPress === 37) {
      MOVING_LEFT = true;
    } else if (keyPress === 39) {
      MOVING_RIGHT = true;
    }
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

// MOVING GHOSTS
  function ghostMove(name) {
    var gRoute = Math.random();
    console.log(gRoute);
    var dx = 0;
    var dy = 0;

    if (gRoute < 0.25) {
      dy++;
    } else if (gRoute < 0.5) {
      dy--;
    } else if (gRoute < 0.75) {
      dx--;
    } else {
      dx++;
    }
    if (checkRectCollide(name[0] + dx, name[1] + dy) === true) {
      name[0] = name[0];
      name[1] = name[1];
      ghostMove(name);
    } else if (checkRectCollide(name[0] + dx, name[1] + dy) === false) {
      name[0] = name[0] + dx;
      name[1] = name[1] + dy;
    }
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

// RESTARTING GRID
function restartGame() {
  for (var i = 0; i < map.length; i++) {
    for (var k = 0; k < map[i].length; k++) {
      if (map[i][k] === 3) {
        map[i][k] = 0;
      }
      if (map[i][k] === 4) {
        map[i][k] = 1;
      }
    }
  }
  pMAN          = [220, 420];
  blinkyGHOST   = [160, 320];
  inkyGHOST     = [200, 280];
  pinkyGHOST    = [200, 320];
  clydeGHOST    = [240, 320];
}
