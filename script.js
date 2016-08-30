var y = 220;
var x = 220;

var pMAN    = [x, y];
var rGHOST  = [0, 0];
var bGHOST  = [0, 0];
var pGHOST  = [0, 0];
var oGHOST  = [0, 0];
var cGRID = [];

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

// TO RESTRICT MOVEMENT OF PACMAN
function defaultMovements () {
  MOVING_UP = false;
  MOVING_DOWN = false;
  MOVING_LEFT = false;
  MOVING_RIGHT = false;
}

// FORMING GRIDS & NAMING THEM IN ARRAY
for(var i = 0; i < cH; i += 40) {
  var arrayK = [];
  for(var k = 0; k < cW; k += 40) {

    ctx.fillStyle = 'orange';
    ctx.strokeRect(k, i, 40, 40);
    ctx.fillRect(k, i, 40, 40);
    arrayK.push(0);
  }
  cGRID.push(arrayK);
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

// INITIALIZING CANVAS PROPERTIES
function initCanvas () {
  // var pacman = new Image();
  // pacman.src = 'pacman.png';
  function pM () {
    drawPM();
    moveIcons();
    pMAN[0] = x;
    pMAN[1] = y;
  }
  var movePMInterval = setInterval(pM, 10);
}

// PM CAN ONLY MOVE IN GRIDS OF 20 OR 40
function moveIcons () {
  if (MOVING_DOWN) {
    if (y === cH - 20) {
      MOVING_DOWN = false;
      y = y;
    } else {
      y++;
    }
    pMAN[1] = y;
  }
  if (MOVING_UP) {
    if (y === 20) {
      MOVING_UP = false;
      y = y;
    } else {
      y--;
    }
    pMAN[1] = y;
  }
  if (MOVING_LEFT) {
    if (x === 20) {
      MOVING_LEFT = false;
      x = x;
    } else {
      x--;
    }
    pMAN[0] = x;
  }
  if (MOVING_RIGHT) {
    if (x === cW - 20) {
      MOVING_RIGHT = false;
      x = x;
    } else {
      x++;
    }
    pMAN[0] = x;
  }
}

function drawPM() {
  ctx.save();
  // ctx.clearRect(0, 0, cW, cH);

  // DRAWING HERE
  ctx.beginPath();
  ctx.arc(x, y, 15, 0.25*Math.PI, 1.7*Math.PI);
  ctx.lineTo(x-8,y);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();

  // ctx.drawImage(pacman, x, y, 30, 30);
  // RESTORING
  ctx.restore();
}
