var y = 200;
var x = 200;

var MOVING_UP = false;
var MOVING_DOWN = false;
var MOVING_LEFT = false;
var MOVING_RIGHT = false;

//  GAME START CONTROL
window.addEventListener('load', function (event) {
  initCanvas();
});

// LISTENING FOR KEYBOARD INPUTS
document.addEventListener('keydown', function (event) {
  var keyPress = event.keyCode;
  MOVING_UP = false;
  MOVING_DOWN = false;
  MOVING_LEFT = false;
  MOVING_RIGHT = false;
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
  var pacman = new Image();
  pacman.src = 'pacman.png';
  var ctx = document.getElementById('gCanvas').getContext('2d');
  var cW = ctx.canvas.width;
  var cH = ctx.canvas.height;

  function movePM () {
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

    ctx.save();
    ctx.clearRect(0, 0, cW, cH);
    // DRAWING HERE
    ctx.drawImage(pacman, x, y, 30, 30);
    // RESTORING
    ctx.restore();
  }
  var movePMInterval = setInterval(movePM, 15);
}

function hitWall() {
  x = x;
  y = y
}
