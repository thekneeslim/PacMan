var y = 200;
var x = 200;

//  GAME START CONTROL
window.addEventListener('load', function (event) {
  initCanvas();
});

// LISTENING FOR KEYBOARD INPUTS
document.addEventListener('keydown', function (event) {
  var keyPress = event.keyCode;
  if (keyPress === 38 || keyPress === 40) {
    xAxis(keyPress);
  } else if (keyPress === 37 || keyPress === 39) {
    yAxis(keyPress);
  }
});
//   if (keyPress === 38) {
//     y--;
//   } else if (keyPress === 40) {
//     y++;
//   } else if (keyPress === 37) {
//     x--;
//   } else if (keyPress === 39) {
//     x++;
//   }
// });

function xAxis (m) {
  if(m === 37) {
    x--;
  } else if (m === 39) {
    x++;
  }
}

function yAxis (n) {
  if(n === 38) {
    return x--;
  } else if (n === 40) {
    return x++;
  }
}

// INITIALIZING CANVAS PROPERTIES
function initCanvas () {
  var pacman = new Image();
  pacman.src = 'pacman.png';
  var ctx = document.getElementById('gCanvas').getContext('2d');
  var cW = ctx.canvas.width;
  var cH = ctx.canvas.height;

  function movePM () {
    ctx.save();
    ctx.clearRect(0, 0, cW, cH);
    // DRAWING HERE
    ctx.drawImage(pacman, x, y, 30, 30);
    // x++;
    // RESTORING
    ctx.restore();
  }
  var movePMInterval = setInterval(movePM, 15);
}

function hitWall() {
  x = x;
  y = y
}
