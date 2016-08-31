var y = 420;
var x = 220;

var pMAN    = [x, y];
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

function drawGrid(rx, ry, w, h) {
  for (var i = 0; i < rects.length; i++) {
    ctx.strokeStyle = "blue";
    ctx.strokeRect(rects[i].rx, rects[i].ry, rects[i].w, rects[i].h);
  }
}

// INITIALIZING CANVAS PROPERTIES
function initCanvas () {
  // var pacman = new Image();
  // pacman.src = 'pacman.png';
  function pM () {
    drawPM();
    if (checkBorder() === true) {
      moveIcons();
      pMAN[0] = x;
      pMAN[1] = y;
    }
  }
  var movePMInterval = setInterval(pM, 10);
}

function drawPM() {
  ctx.save();
  ctx.clearRect(0, 0, cW, cH);

  // DRAWING HERE
  // maze()
  drawGrid();
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  // ctx.shadowcolour = 'rgba(0,0,0,0)';
  ctx.arc(x, y, 15, 0.25*Math.PI, 1.7*Math.PI);
  ctx.lineTo(x-8,y);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();

  // ctx.drawImage(pacman, x, y, 30, 30);
  // RESTORING
  ctx.restore();
}

// FORMING GRIDS & NAMING THEM IN ARRAY
for(var i = 0; i < cH; i += 40) {
  var arrayK = [];
  for(var k = 0; k < cW; k += 40) {

    ctx.strokeRect(k, i, 40, 40);
    arrayK.push(0);
  }
  cGRID.push(arrayK);
}

// LISTENING FOR KEYBOARD INPUTS
document.addEventListener('keydown', function (event) {
  var keyPress = event.keyCode;
  defaultMovements();
  // if (isPointInRects(x,y) === false) {
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

// CHECKING BORDER
function checkBorder () {
  if(MOVING_DOWN && y === cH - 20) {
    y = y;
    MOVING_DOWN = false;
  }
  if (MOVING_UP && y === 20) {
    y = y
    MOVING_UP = false;
  }
  if (MOVING_RIGHT && x === cW - 20) {
    x = x;
    MOVING_RIGHT = false;
  }
  if (MOVING_LEFT && x === 20) {
    x = x
    MOVING_LEFT = false;
  }
  return true;
}

// MOVING ICONS
function moveIcons () {
  if (MOVING_DOWN) {
    y++;
  }
  if (MOVING_UP) {
    y--;
  }
  if (MOVING_LEFT) {
      x--;
  }
  if (MOVING_RIGHT) {
      x++;
  }
}

// PREVENTING ICONS FROM ENTERING RECT TOP
function checkRectCollide() {
  for(var i = 0; i < rects.length; i++) {
    // CHECKING TOP COLLIDE
    if (y === (rects[i].ry - 20)) {
      if (x >= (rects[i].rx - 20) && x <= (rects[i].rx + rects[i].w - 20)) {
        MOVING_DOWN = false;
        y = y;
      }
    }
    // CHECKING BOTTOM COLLIDE
    if (y === (rects[i].ry + rects[i].h + 20)) {
      if (x >= (rects[i].rx - 20) && x <= (rects[i].rx + rects[i].w + 20)) {
        MOVING_UP = false;
        y = y;
      }
    }
    // CHECKING LEFT COLLIDE
    if (x === (rects[i].rx - 20)) {
      if (y >= (rects[i].ry - 20) && x <= (rects[i].ry + rects[i].h - 20)) {
        MOVING_RIGHT = false;
        x = x;
      }
    }
    // CHECKING RIGHT COLLIDE
    if (x === (rects[i].rx + rects[i].w + 20)) {
      if (y >= (rects[i].ry - 20) && y <= (rects[i].ry + rects[i].h + 20)) {
        MOVING_LEFT = false;
        x = x;
      }
    }
  }
  return true;
}

// CHECKING IF POINT IS IN RECTANGLE
function isPointInRects(px, py) {
  for (var i = 0; i < rects.length; i++) {
    if (isInRect(rects[i].rx, rects[i].ry, rects[i].w, rects[i].h, px, py)) {
      return true;
    }
  }
  return false;
}

// RETURNING T/F IF POINT IS IN RECTANGLE
function isInRect(rx, ry, w, h, px, py) {
  if (px < rx) {
    return false;
  }
  if (py < ry) {
    return false;
  }
  if (px > (rx + w)) {
    return false;
  }
  if (py > (ry + h)) {
    return false;
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

// DRAWING THE MAZE
// function maze() {
//   ctx.fillStyle = "orange";
//   ctx.beginPath();
//   ctx.fillRect(40, 40, 120, 80);
//   ctx.fillRect(200, 0, 40, 120);
//   ctx.fillRect(280, 40, 120, 80);
//   ctx.fillRect(40, 160, 80, 80);
//   ctx.fillRect(320, 160, 80, 80);
//   ctx.fillRect(0, 280, 80, 40);
//   ctx.fillRect(360, 280, 80, 40);
//   ctx.fillRect(0, 360, 80, 80);
//   ctx.fillRect(360, 360, 80, 80);
//   ctx.fillRect(40, 480, 40, 40);
//   ctx.fillRect(360, 480, 40, 40);
//   ctx.fillRect(120, 440, 80, 40);
//   ctx.fillRect(240, 440, 80, 40);
//   ctx.closePath();
//   // GHOST HOME
//   ctx.beginPath();
//   ctx.moveTo(200, 280);
//   ctx.lineTo(120, 280);
//   ctx.lineTo(120, 400);
//   ctx.lineTo(320, 400);
//   ctx.lineTo(320, 280);
//   ctx.lineTo(240, 280);
//   ctx.lineTo(240, 320);
//   ctx.lineTo(280, 320);
//   ctx.lineTo(280, 360);
//   ctx.lineTo(160, 360);
//   ctx.lineTo(160, 320);
//   ctx.lineTo(200, 320);
//   ctx.fill();
//   ctx.closePath();
//   // T ABOVE GHOST HOME
//   ctx.beginPath();
//   ctx.moveTo(160, 160);
//   ctx.lineTo(160, 200);
//   ctx.lineTo(200, 200);
//   ctx.lineTo(200, 240);
//   ctx.lineTo(240, 240);
//   ctx.lineTo(240, 200);
//   ctx.lineTo(280, 200);
//   ctx.lineTo(280, 160);
//   ctx.fill();
//   ctx.closePath();
//   // BOTTOM LEFT L
//   ctx.beginPath();
//   ctx.moveTo(40, 560);
//   ctx.lineTo(40, 640);
//   ctx.lineTo(120, 640);
//   ctx.lineTo(120, 600);
//   ctx.lineTo(80, 600);
//   ctx.lineTo(80, 560);
//   ctx.fill();
//   ctx.closePath();
// // BOTTOM LEFT INVERTED L
//   ctx.beginPath();
//   ctx.moveTo(120, 520);
//   ctx.lineTo(120, 560);
//   ctx.lineTo(160, 560);
//   ctx.lineTo(160, 640);
//   ctx.lineTo(200, 640);
//   ctx.lineTo(200, 520);
//   ctx.fill();
//   ctx.closePath();
//   // BOTTOM right INVERTED L
//   ctx.beginPath();
//   ctx.moveTo(240, 520);
//   ctx.lineTo(240, 640);
//   ctx.lineTo(280, 640);
//   ctx.lineTo(280, 560);
//   ctx.lineTo(320, 560);
//   ctx.lineTo(320, 520);
//   ctx.fill();
//   ctx.closePath();
//   // BOTTOM RIGHT L
//   ctx.beginPath();
//   ctx.moveTo(360, 560);
//   ctx.lineTo(360, 600);
//   ctx.lineTo(320, 600);
//   ctx.lineTo(320, 640);
//   ctx.lineTo(400, 640);
//   ctx.lineTo(400, 560);
//   ctx.fill();
//   ctx.closePath();
// }
