$(document).ready(function() {
  var canvas = $('#playground')[0];
  var imgs_bucket = {
    'game_over': 'http://typesetting.californiafonts.com/fonts/game-over/game-over.jpg'
  };

  var game = new Game(canvas, imgs_bucket);

  game.redraw();

  $(document).on("keydown", function(event) {

    game.keydownListener(event.which);
    game.redraw();

  });

  game.animate();

});
