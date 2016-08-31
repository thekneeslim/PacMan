var x = 220;
var y = 420;

var pMAN    = [220, 420];
var rGHOST  = [0, 0];
var bGHOST  = [0, 0];
var pGHOST  = [0, 0];
var oGHOST  = [0, 0];
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

var map = [   [0,0,0,0,0,2,0,0,0,0,0],
              [1,2,2,2,0,2,0,2,2,2,1],
              [0,2,2,2,0,2,0,2,2,2,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,2,2,0,2,2,2,0,2,2,0],
              [0,2,2,0,2,2,2,0,2,2,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [2,2,0,2,2,5,2,2,0,2,2],
              [0,0,0,2,5,5,5,2,0,0,0],
              [2,2,0,2,2,2,2,2,0,2,2],
              [2,2,0,0,0,0,0,0,0,2,2],
              [0,0,0,2,2,0,2,2,0,0,0],
              [0,2,0,0,0,0,0,0,0,2,0],
              [0,0,0,2,2,0,2,2,0,0,0],
              [1,2,0,0,2,0,2,0,0,2,1],
              [0,2,2,0,2,0,2,0,2,2,0],
              [0,0,0,0,0,0,0,0,0,0,0]];

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

// DRAWING PACMAN GRID MAZE
function drawGrid(rx, ry, w, h) {
  for (var i = 0; i < rects.length; i++) {
    ctx.strokeStyle = "blue";
    ctx.strokeRect(rects[i].rx, rects[i].ry, rects[i].w, rects[i].h);
  }
}

// INITIALIZING CANVAS PROPERTIES
function initCanvas () {
  mainGrid();
  // var pacman = new Image();
  // pacman.src = 'pacman.png';
  function pM () {
    drawPM(pMAN[0], pMAN[1]);
    if (checkBorder(pMAN[0], pMAN[1])) {
      moveIcons();
      // teleport(pMAN[0], pMAN[1]);
      pMAN[0] = x;
      pMAN[1] = y;
      // }
    }
  }
  var movePMInterval = setInterval(pM, 10);
}

function drawPM() {
  ctx.save();
  ctx.clearRect(0, 0, cW, cH);

  // DRAWING HERE
  drawFood();
  drawGrid();
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  // ctx.shadowcolour = 'rgba(0,0,0,0)';
  ctx.arc(pMAN[0], pMAN[1], 13, 0.25*Math.PI, 1.7*Math.PI);
  ctx.lineTo(x-8,y);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();

  // ctx.drawImage(pacman, x, y, 30, 30);
  // RESTORING
  ctx.restore();
}

// FORMING GRIDS & NAMING THEM IN ARRAY
function mainGrid() {
  for(var i = 0; i < cH; i += 40) {
    var arrayK = [];
    for(var k = 0; k < cW; k += 40) {

      ctx.strokeRect(k, i, 40, 40);
      arrayK.push(0);

    }
    cGRID.push(arrayK);
  }
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
  // function teleport(ix, iy) {
  //   if (ix === 20 && iy === 340) {
  //     ix = 420;
  //     iy = 340;
  //     drawPM(420, 340)
  //     x--
  //   }
  // }

// CHECKING BORDER
function checkBorder (ix, iy) {
  if(MOVING_DOWN && iy === cH - 20) {
    y = y;
    MOVING_DOWN = false;
  }
  if (MOVING_UP && iy === 20) {
    y = y
    MOVING_UP = false;
  }
  if (MOVING_RIGHT && ix === cW - 20) {
    x = x;
    MOVING_RIGHT = false;
  }
  if (MOVING_LEFT && ix === 20) {
    x = x
    MOVING_LEFT = false;
  }
  return true;
}

// MOVING ICONS
function moveIcons () {
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
  if (checkRectCollide(x + dx, y + dy) === false) {
    x = x + dx;
    y = y + dy;
  }
}

// PREVENTING ICONS FROM ENTERING RECTANGLE
function checkRectCollide(ix, iy) {
  var collisionDistance = 15;

  for(var i = 0; i < rects.length; i++) {
    var isHit = false;
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
        // MOVING_LEFT = false;
        isHit = true;
        // x = x;
      }
    }
    rects[i].isHit = isHit;
  }

  return false;
}

// TO RESTRICT MOVEMENT OF PACMAN
function defaultMovements () {
  MOVING_UP = false;
  MOVING_DOWN = false;
  MOVING_LEFT = false;
  MOVING_RIGHT = false;
}
