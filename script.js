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
// TO RESTRICT MOVEMENT OF PACMAN
function defaultMovements() {
  MOVING_UP = false;
  MOVING_DOWN = false;
  MOVING_LEFT = false;
  MOVING_RIGHT = false;
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
  var ctx = document.getElementById('gCanvas').getContext('2d');
  var cW = ctx.canvas.width;
  var cH = ctx.canvas.height;

  function movePM () {
    if (MOVING_DOWN) {
      if (y === cH - 20) {
        MOVING_DOWN = false;
        y = y;
      } else {
        y++;
      }
    }
    if (MOVING_UP) {
      if (y === 20) {
        MOVING_UP = false;
        y = y;
      } else {
        y--;
      }
    }
    if (MOVING_LEFT) {
      if (x === 20) {
        MOVING_LEFT = false;
        x = x;
      } else {
        x--;
      }
    }
    if (MOVING_RIGHT) {
      if (x === cW - 20) {
        MOVING_RIGHT = false;
        x = x;
      } else {
        x++;
      }
    }

    ctx.save();
    ctx.clearRect(0, 0, cW, cH);

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
  var movePMInterval = setInterval(movePM, 10);
}
