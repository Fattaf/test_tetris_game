$(document).ready(function() {
  var canvas = $('#playground')[0];
  var imgs_bucket = {
    'simlpe_encorage': 'http://dc482.4shared.com/img/vpr5IWZY/s3/137a688eb20/awesome_face_17.gif',
    'great_encorage': 'http://fc00.deviantart.net/fs70/i/2011/044/5/8/my___awesome___face_by_daemonofdecay-d39fhp5.png',
    'game_over': 'http://typesetting.californiafonts.com/fonts/game-over/game-over.jpg'
  };

  var game = new Game(canvas, imgs_bucket);
  game.animate();

  $(document).on("keydown", function(event) {
    game.keydownListener(event.which);
  });

});
