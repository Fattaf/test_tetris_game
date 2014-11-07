// movement
//

var redraw = function(figure, field, canvas, context) {
  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);
  // draw
  field.drawField(context);
  figure.drawFigure(context);
};

var animate = function(figure, field, canvas, context) {
  var disp_step = 40;
  figure.position[1] += disp_step;

  redraw(figure, field, canvas, context);
  // request new frame
  setTimeout(function() {
    animate(figure, field, canvas, context);
  }, 1000)
}

// main script
//

$(document).ready(function() {
  var canvas = $('#playground')[0];
  var context = canvas.getContext('2d');

  var field = new Field();
  var figureBuilder = new FigureBuilder()
  var figure = figureBuilder.build_random_figure();

  field.drawField(context);
  figure.drawFigure(context);

  $(document).on("keydown", function(event) {
    switch(event.which) {
      case 37: // left
        figure.pullLeft(field);
        break;
      case 38: // up
        figure.turn();
        break;
      case 39: // right
        figure.pullRight(field);
      break;
      case 40: // down
        figure.pullDown();
      break;
      default: return; // exit this handler for other keys
    };
    redraw(figure, field, canvas, context);
  });

  // setTimeout(function() {
  //   animate(figure, field, canvas, context);
  // }, 1000);
});
