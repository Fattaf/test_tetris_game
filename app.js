// movement
//

// var figure_move = false;

var Game = function() {
  this.score = 0;

  this.update_score = function(removed_lines) {
    this.score += removed_lines * 10;
  };

  this.redraw = function(figure, field, canvas, context) {
    // clear
    context.clearRect(0, 0, canvas.width, canvas.height);
    // draw
    field.drawField(context);
    figure.drawFigure(context);

    context.font = 'italic 30pt Calibri';      // FIXME: change font
    context.fillText('Score: ' + this.score, 420, 100);
  };
};

var animate = function(game, figure, field, canvas, context) {
  var disp_step = 40;

  if (figure.pullDown(field) == false) {
    field.addToCover(figure.countShape());

    figure = figureBuilder.build_random_figure();

    var removed_lines = field.handleFullCoveredLines();
    game.update_score(removed_lines);

    if (field.isOverfilled()) { alert('Game Over!!!'); };
    return false;
  };

  figure.position[1]++;
  game.redraw(figure, field, canvas, context);

  // request new frame
  setTimeout(function() {
    animate(game, figure, field, canvas, context);
  }, 1000);
};

// main script
//

$(document).ready(function() {
  var canvas = $('#playground')[0];
  var context = canvas.getContext('2d');

  var game            = new Game();

  var drawAdapter     = new DrawAdapter(canvas);
  var field           = new Field(drawAdapter);
  var figureBuilder   = new FigureBuilder(drawAdapter);
  var figure          = figureBuilder.build_random_figure();

  figure_move = true;
  game.redraw(figure, field, canvas, context);

  $(document).on("keydown", function(event) {
    switch(event.which) {
      case 37: // left
        figure.pullLeft(0);
        break;
      case 38: // up
        figure.turn(0, field.x_cells);
        break;
      case 39: // right
        figure.pullRight(field.x_cells);
      break;
      case 40: // down
        if (figure.pullDown(field) == false) {
          // figure_move = false;
          field.addToCover(figure.countShape());

          figure = figureBuilder.build_random_figure();

          var removed_lines = field.handleFullCoveredLines();
          game.update_score(removed_lines);

          if (field.isOverfilled()) { alert('Game Over!!!'); };
        };
      break;
      default: return; // exit this handler for other keys
    };
    game.redraw(figure, field, canvas, context);
  });

  setTimeout(function() {
    animate(game, figure, field, canvas, context);
  }, 1000);

});
