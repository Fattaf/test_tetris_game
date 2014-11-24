$(document).ready(function() {
  var canvas = $('#playground')[0];

  var game = new Game(canvas);

  game.redraw();

  $(document).on("keydown", function(event) {

    game.keydownListener(event.which);
    game.redraw();

  });

  game.animate();

});
