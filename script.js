var y = 0;
var x = 0;

//  GAME START CONTROL
window.addEventListener('load', function (event) {
  initCanvas();
});

// DIRECTION OF PACMAN
// var arrowUp = document.

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
    // RESTORING
    ctx.restore();
  }
  // LISTENING FOR KEYBOARD INPUTS
  document.addEventListener('keydown', function (event) {
    var keyPress = (event.keyCode);
    console.log(keyPress + " | " + event.keyCode);
    if (keyPress === 38) {
      y--;
    } else if (keyPress === 40) {
      y++;
    } else if (keyPress === 37) {
      x--;
    } else if (keyPress === 39) {
      x++;
    }
  });
  var movePMInterval = setInterval(movePM, 15);
}
