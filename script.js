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

  // function playersObject() {
  //   this.x = 0;
  //   this.y = 0;
  //   this.render = function(ctx, imgX, imgY) {
  //
  //   }
  // }
  function movePM () {
    ctx.save();
    ctx.clearRect(0, 0, cW, cH);
    // DRAWING HERE
    ctx.drawImage(pacman, x, y, 30, 30);
    x++;
    // RESTORING
    ctx.restore();
  }
  var movePMInterval = setInterval(movePM, 15);
}
