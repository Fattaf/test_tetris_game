// FIXME: broken
// var animate = function(game, figure, figureBuilder, field, canvas, context) {
//   var disp_step = 40;

//   if (figure.pullDown(field) == false) {
//     field.addToCover(figure.countShape());

//     figure = figureBuilder.build_random_figure();

//     var removed_lines = field.handleFullCoveredLines();
//     game.update_score(removed_lines);

//     if (field.isOverfilled()) { alert('Game Over!!!'); };
//     return false;
//   };

//   figure.position[1]++;
//   game.redraw(figure, field, canvas, context);

//   // request new frame
//   setTimeout(function() {
//     animate(game, figure, figureBuilder, field, canvas, context);
//   }, 1000);
// };

// main script
//

$(document).ready(function() {
  var canvas = $('#playground')[0];

  var game = new Game(canvas);

  game.redraw();

  $(document).on("keydown", function(event) {

    game.keydownListener(event.which);
    game.redraw();

  });

  // setTimeout(function() {
  //   animate(game, figure, figureBuilder, field, canvas, context);
  // }, 1000);

});
