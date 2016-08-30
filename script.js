var y = 420;
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

// INITIALIZING CANVAS PROPERTIES
function initCanvas () {
  // var pacman = new Image();
  // pacman.src = 'pacman.png';
  maze();
  function pM () {
    drawPM();
    moveIcons();
    pMAN[0] = x;
    pMAN[1] = y;
  }
  var movePMInterval = setInterval(pM, 10);
}

function drawPM() {
  ctx.save();
  // ctx.clearRect(0, 0, cW, cH);

  // DRAWING HERE
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

// DRAWING THE MAZE
function maze() {
  ctx.fillStyle = "orange";
  ctx.fillRect(40, 40, 120, 80);
  ctx.fillRect(200, 0, 40, 120);
  ctx.fillRect(280, 40, 120, 80);
  ctx.fillRect(40, 160, 80, 80);
  ctx.fillRect(320, 160, 80, 80);
  ctx.fillRect(0, 280, 80, 40);
  ctx.fillRect(360, 280, 80, 40);
  ctx.fillRect(0, 360, 80, 80);
  ctx.fillRect(360, 360, 80, 80);
  ctx.fillRect(40, 480, 40, 40);
  ctx.fillRect(360, 480, 40, 40);
  ctx.fillRect(120, 440, 80, 40);
  ctx.fillRect(240, 440, 80, 40);
  // GHOST HOME
  ctx.beginPath();
  ctx.moveTo(200, 280);
  ctx.lineTo(120, 280);
  ctx.lineTo(120, 400);
  ctx.lineTo(320, 400);
  ctx.lineTo(320, 280);
  ctx.lineTo(240, 280);
  ctx.lineTo(240, 320);
  ctx.lineTo(280, 320);
  ctx.lineTo(280, 360);
  ctx.lineTo(160, 360);
  ctx.lineTo(160, 320);
  ctx.lineTo(200, 320);
  ctx.fill();
  ctx.closePath();
  // T ABOVE GHOST HOME
  ctx.beginPath();
  ctx.moveTo(160, 160);
  ctx.lineTo(160, 200);
  ctx.lineTo(200, 200);
  ctx.lineTo(200, 240);
  ctx.lineTo(240, 240);
  ctx.lineTo(240, 200);
  ctx.lineTo(280, 200);
  ctx.lineTo(280, 160);
  ctx.fill();
  ctx.closePath();
  // BOTTOM LEFT L
  ctx.beginPath();
  ctx.moveTo(40, 560);
  ctx.lineTo(40, 640);
  ctx.lineTo(120, 640);
  ctx.lineTo(120, 600);
  ctx.lineTo(80, 600);
  ctx.lineTo(80, 560);
  ctx.fill();
  ctx.closePath();
// BOTTOM LEFT INVERTED L
  ctx.beginPath();
  ctx.moveTo(120, 520);
  ctx.lineTo(120, 560);
  ctx.lineTo(160, 560);
  ctx.lineTo(160, 640);
  ctx.lineTo(200, 640);
  ctx.lineTo(200, 520);
  ctx.fill();
  ctx.closePath();
  // BOTTOM right INVERTED L
  ctx.beginPath();
  ctx.moveTo(240, 520);
  ctx.lineTo(240, 640);
  ctx.lineTo(280, 640);
  ctx.lineTo(280, 560);
  ctx.lineTo(320, 560);
  ctx.lineTo(320, 520);
  ctx.fill();
  ctx.closePath();
  // BOTTOM RIGHT L
  ctx.beginPath();
  ctx.moveTo(360, 560);
  ctx.lineTo(360, 600);
  ctx.lineTo(320, 600);
  ctx.lineTo(320, 640);
  ctx.lineTo(400, 640);
  ctx.lineTo(400, 560);
  ctx.fill();
  ctx.closePath();
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

// TO RESTRICT MOVEMENT OF PACMAN
function defaultMovements () {
  MOVING_UP = false;
  MOVING_DOWN = false;
  MOVING_LEFT = false;
  MOVING_RIGHT = false;
}
